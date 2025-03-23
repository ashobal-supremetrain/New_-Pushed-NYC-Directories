import * as XLSX from 'xlsx';
import path from 'path';

export interface Business {
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
}

export async function readExcelFiles(): Promise<Business[]> {
  const businesses: Business[] = [];
  const dataDir = path.join(process.cwd(), '..', 'data');
  
  const files = [
    'Google Maps Listings Scraper _by Keywords_.xlsx',
    'lead.xlsx',
    'lead 3.xlsx',
    'lead 4.xlsx',
    'lead 5.xlsx'
  ];

  for (const file of files) {
    try {
      const workbook = XLSX.readFile(path.join(dataDir, file));
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      data.forEach((row: any) => {
        // Map the Excel columns to our Business interface
        const business: Business = {
          name: row['Business Name'] || row['name'] || '',
          category: row['Category'] || row['category'] || 'Uncategorized',
          address: row['Address'] || row['address'] || '',
          phone: row['Phone'] || row['phone'] || '',
          email: row['Email'] || row['email'] || '',
          website: row['Website'] || row['website'] || '',
          description: row['Description'] || row['description'] || '',
          rating: parseFloat(row['Rating'] || row['rating']) || undefined,
          reviews: parseInt(row['Reviews'] || row['reviews']) || undefined,
          latitude: parseFloat(row['Latitude'] || row['latitude']) || undefined,
          longitude: parseFloat(row['Longitude'] || row['longitude']) || undefined
        };

        if (business.name && business.address) {
          businesses.push(business);
        }
      });
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }

  return businesses;
} 