import * as XLSX from 'xlsx';
import { connectToDatabase } from '../lib/mongodb';
import path from 'path';

interface Lead {
  name: string;
  category: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Category mapping for standardization
const categoryMapping: { [key: string]: string } = {
  'restaurant': 'restaurants',
  'cafe': 'restaurants',
  'bar': 'restaurants',
  'food': 'restaurants',
  'dining': 'restaurants',
  'retail': 'retail',
  'store': 'retail',
  'shop': 'retail',
  'healthcare': 'healthcare',
  'medical': 'healthcare',
  'doctor': 'healthcare',
  'dentist': 'healthcare',
  'clinic': 'healthcare',
  'education': 'education',
  'school': 'education',
  'university': 'education',
  'college': 'education',
  'professional-services': 'professional-services',
  'legal': 'professional-services',
  'lawyer': 'professional-services',
  'attorney': 'professional-services',
  'accountant': 'professional-services',
  'automotive': 'automotive',
  'car': 'automotive',
  'auto': 'automotive',
  'beauty': 'beauty',
  'salon': 'beauty',
  'spa': 'beauty',
  'fitness': 'fitness',
  'gym': 'fitness',
  'yoga': 'fitness',
  'entertainment': 'entertainment',
  'events': 'entertainment',
  'home-services': 'home-services',
  'contractor': 'home-services',
  'plumber': 'home-services',
  'electrician': 'home-services'
};

function standardizeCategory(category: string): string {
  const normalized = category.toLowerCase().trim();
  return categoryMapping[normalized] || normalized;
}

function cleanPhoneNumber(phone: string): string | undefined {
  if (!phone) return undefined;
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // If it's a valid number but not 10 digits, return as is
  if (/^\+?\d+$/.test(cleaned)) {
    return cleaned;
  }
  
  return undefined;
}

function cleanWebsite(website: string): string | undefined {
  if (!website) return undefined;
  
  // Remove whitespace
  website = website.trim();
  
  // Add https:// if no protocol is specified
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    website = `https://${website}`;
  }
  
  // Validate URL format
  try {
    new URL(website);
    return website;
  } catch {
    return undefined;
  }
}

function cleanRating(rating: any): number | undefined {
  if (!rating) return undefined;
  
  const num = parseFloat(rating);
  if (isNaN(num) || num < 0 || num > 5) return undefined;
  
  return num;
}

function cleanReviews(reviews: any): number | undefined {
  if (!reviews) return undefined;
  
  const num = parseInt(reviews.toString().replace(/,/g, ''));
  if (isNaN(num) || num < 0) return undefined;
  
  return num;
}

function cleanCoordinates(lat: any, lng: any): { latitude?: number; longitude?: number } {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  return {
    latitude: !isNaN(latitude) && latitude >= -90 && latitude <= 90 ? latitude : undefined,
    longitude: !isNaN(longitude) && longitude >= -180 && longitude <= 180 ? longitude : undefined
  };
}

async function importLeads() {
  try {
    // Connect to MongoDB
    const { db, client } = await connectToDatabase();
    console.log('Connected to MongoDB');

    // Read the Excel file
    const workbook = XLSX.readFile(path.join(process.cwd(), '..', 'data', 'all_leads.xlsx'));
    console.log('Reading Excel file from:', path.join(process.cwd(), '..', 'data', 'all_leads.xlsx'));
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${rawData.length} rows in the Excel file`);

    // Clean and transform the data
    const leads: Lead[] = rawData.map((row: any) => {
      // Extract and clean the business name
      const name = (row['Name'] || row['Business Name'] || '').trim();
      
      // Extract and clean the category
      const category = standardizeCategory(row['Category'] || 'Uncategorized');
      
      // Clean the phone number
      const phone = cleanPhoneNumber(row['Phone'] || row['Telephone'] || row['Contact']);
      
      // Clean the website URL
      const website = cleanWebsite(row['Website'] || row['Web']);
      
      // Clean the rating
      const rating = cleanRating(row['Rating'] || row['Stars']);
      
      // Clean the reviews count
      const reviews = cleanReviews(row['Reviews'] || row['Review_count'] || row['Review Count']);
      
      // Clean coordinates
      const { latitude, longitude } = cleanCoordinates(
        row['Latitude'] || row['Lat'],
        row['Longitude'] || row['Lng'] || row['Long']
      );

      return {
        name,
        category,
        address: (row['Address'] || '').trim(),
        phone,
        email: (row['Email'] || '').trim().toLowerCase(),
        website,
        description: (row['Description'] || row['About'] || row['Tags'] || '').trim(),
        rating,
        reviews,
        latitude,
        longitude,
        isVerified: true,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }).filter(lead => lead.name && lead.address); // Only keep leads with at least a name and address

    // Clear existing data
    await db.collection('businesses').deleteMany({});
    console.log('Cleared existing data');

    // Insert the cleaned data
    const result = await db.collection('businesses').insertMany(leads);
    console.log(`Successfully imported ${result.insertedCount} leads`);

    // Close the connection
    await client.close();
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error importing leads:', error);
    process.exit(1);
  }
}

importLeads(); 