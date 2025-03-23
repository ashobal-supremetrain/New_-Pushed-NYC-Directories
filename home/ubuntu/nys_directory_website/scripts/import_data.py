import pandas as pd
import json
import os
import re
from datetime import datetime, timedelta
import random

# Read the Excel file
df = pd.read_excel('/home/ubuntu/upload/Google Maps Listings Scraper _by Keywords_.xlsx')

# Clean and process the data
df = df.fillna('')  # Replace NaN values with empty strings

# Map categories from the data to our predefined categories
category_mapping = {
    'Catering': 'lifestyle',
    'Restaurant': 'lifestyle',
    'Food': 'lifestyle',
    'Cafe': 'lifestyle',
    'Bakery': 'lifestyle',
    'Bar': 'lifestyle',
    'Coffee': 'lifestyle',
    'Grocery': 'lifestyle',
    'Retail': 'lifestyle',
    'Shopping': 'lifestyle',
    'Store': 'lifestyle',
    'Market': 'lifestyle',
    'Supermarket': 'lifestyle',
    'Deli': 'lifestyle',
    'Caterer': 'lifestyle',
    'Catering service': 'lifestyle',
    'Event planning': 'lifestyle',
    'Event venue': 'events',
    'Wedding': 'events',
    'Party': 'events',
    'Entertainment': 'events',
    'Museum': 'events',
    'Theater': 'events',
    'Gallery': 'events',
    'Art': 'events',
    'Attraction': 'events',
    'Tour': 'events',
    'Park': 'events',
    'Recreation': 'events',
    'Fitness': 'lifestyle',
    'Gym': 'lifestyle',
    'Yoga': 'lifestyle',
    'Spa': 'lifestyle',
    'Salon': 'lifestyle',
    'Beauty': 'lifestyle',
    'Hair': 'lifestyle',
    'Nail': 'lifestyle',
    'Massage': 'lifestyle',
    'Health': 'healthcare',
    'Medical': 'healthcare',
    'Doctor': 'healthcare',
    'Dentist': 'healthcare',
    'Hospital': 'healthcare',
    'Clinic': 'healthcare',
    'Pharmacy': 'healthcare',
    'Urgent care': 'healthcare',
    'Emergency': 'healthcare',
    'Law': 'legal',
    'Legal': 'legal',
    'Attorney': 'legal',
    'Lawyer': 'legal',
    'Notary': 'legal',
    'Accountant': 'legal',
    'Financial': 'legal',
    'Bank': 'legal',
    'Insurance': 'legal',
    'Tax': 'legal',
    'Government': 'government',
    'City': 'government',
    'County': 'government',
    'State': 'government',
    'Federal': 'government',
    'Agency': 'government',
    'Office': 'government',
    'Department': 'government',
    'Bureau': 'government',
    'Court': 'government',
    'Police': 'safety',
    'Fire': 'safety',
    'Emergency': 'safety',
    'Security': 'safety',
    'School': 'education',
    'College': 'education',
    'University': 'education',
    'Academy': 'education',
    'Institute': 'education',
    'Education': 'education',
    'Learning': 'education',
    'Training': 'education',
    'Tutoring': 'education',
}

# Function to determine category based on keywords
def determine_category(category_text, keyword):
    if not category_text:
        return 'lifestyle'  # Default category
    
    category_text = category_text.lower()
    keyword = keyword.lower()
    
    # Check for exact matches in our mapping
    for key, value in category_mapping.items():
        if key.lower() in category_text or key.lower() in keyword:
            return value
    
    # Default categories based on the keyword
    if 'catering' in keyword.lower():
        return 'lifestyle'
    elif 'restaurant' in keyword.lower():
        return 'lifestyle'
    elif 'event' in keyword.lower():
        return 'events'
    elif 'health' in keyword.lower() or 'medical' in keyword.lower():
        return 'healthcare'
    elif 'legal' in keyword.lower() or 'law' in keyword.lower():
        return 'legal'
    elif 'government' in keyword.lower() or 'city' in keyword.lower():
        return 'government'
    elif 'education' in keyword.lower() or 'school' in keyword.lower():
        return 'education'
    elif 'safety' in keyword.lower() or 'police' in keyword.lower():
        return 'safety'
    
    # Default to lifestyle if no match
    return 'lifestyle'

# Function to determine borough based on address
def determine_borough(address):
    if not address:
        return 'manhattan'  # Default borough
    
    address = address.lower()
    
    if 'brooklyn' in address:
        return 'brooklyn'
    elif 'queens' in address:
        return 'queens'
    elif 'bronx' in address:
        return 'bronx'
    elif 'staten island' in address:
        return 'staten_island'
    else:
        return 'manhattan'  # Default to Manhattan if no match

# Function to extract ZIP code from address
def extract_zip_code(address):
    if not address:
        return '10001'  # Default ZIP code
    
    # Try to find a 5-digit ZIP code
    zip_match = re.search(r'NY\s+(\d{5})', address)
    if zip_match:
        return zip_match.group(1)
    
    # Default ZIP codes based on borough
    borough = determine_borough(address)
    if borough == 'brooklyn':
        return '11201'
    elif borough == 'queens':
        return '11101'
    elif borough == 'bronx':
        return '10451'
    elif borough == 'staten_island':
        return '10301'
    else:
        return '10001'  # Manhattan default

# Function to clean numeric values (handle commas in numbers)
def clean_numeric(value):
    if not value or value == '':
        return None
    
    # Remove commas and convert to appropriate type
    if isinstance(value, str):
        return int(value.replace(',', ''))
    return int(value)

# Process the data into our format
businesses = []
for index, row in df.iterrows():
    # Generate a unique ID
    business_id = f'b{index+1:04d}'
    
    # Determine category
    category = determine_category(row['Category'], row['Keyword'])
    
    # Determine borough and ZIP code
    borough = determine_borough(row['Address'])
    zip_code = extract_zip_code(row['Address'])
    
    # Extract services/tags from the Tags column
    services = []
    if row['Tags']:
        # Split tags by commas if they exist
        tags = str(row['Tags']).split(',')
        services = [tag.strip() for tag in tags if tag.strip()]
    
    # If no services were extracted, use the category as a service
    if not services and row['Category']:
        services = [row['Category']]
    
    # If still no services, add a default one based on the keyword
    if not services:
        services = [row['Keyword'].split(' in ')[0]]
    
    # Determine if the business should be featured (randomly select about 10%)
    is_featured = random.random() < 0.1
    is_premium = random.random() < 0.2
    is_verified = random.random() < 0.5 or is_premium  # Premium listings are always verified
    
    # Create business hours (fictional since not in the data)
    hours = {
        'monday': '9:00 AM - 5:00 PM',
        'tuesday': '9:00 AM - 5:00 PM',
        'wednesday': '9:00 AM - 5:00 PM',
        'thursday': '9:00 AM - 5:00 PM',
        'friday': '9:00 AM - 5:00 PM',
        'saturday': 'Closed' if random.random() < 0.3 else '10:00 AM - 3:00 PM',
        'sunday': 'Closed' if random.random() < 0.5 else '10:00 AM - 3:00 PM'
    }
    
    # Clean numeric values
    try:
        review_count = clean_numeric(row['Review_count'])
        if review_count is None:
            review_count = random.randint(5, 100)
    except:
        review_count = random.randint(5, 100)
    
    try:
        rating = float(row['Rating']) if row['Rating'] and row['Rating'] != '' else round(random.uniform(3.0, 5.0), 1)
    except:
        rating = round(random.uniform(3.0, 5.0), 1)
    
    # Create the business object
    business = {
        'id': business_id,
        'name': row['Name'],
        'description': f"{row['Name']} is a {row['Category'] if row['Category'] else 'business'} located in {borough.replace('_', ' ').title()}, New York. {row['Keyword'].split(' in ')[0]} services available.",
        'categories': [category],
        'address': row['Address'],
        'borough': borough,
        'zipCode': zip_code,
        'phone': row['Telephone'] if row['Telephone'] else '(212) 555-' + str(random.randint(1000, 9999)),
        'email': f"info@{row['Name'].lower().replace(' ', '').replace('&', 'and').replace(',', '').replace('.', '').replace('-', '')}.com",
        'website': row['Website'] if row['Website'] else '',
        'hours': hours,
        'rating': rating,
        'reviewCount': review_count,
        'verified': is_verified,
        'featured': is_featured,
        'premium': is_premium,
        'coordinates': {
            'lat': float(row['Latitude']) if row['Latitude'] and row['Latitude'] != '' else 40.7128,
            'lng': float(row['Longitude']) if row['Longitude'] and row['Longitude'] != '' else -74.0060
        },
        'images': [],
        'services': services,
        'yearEstablished': random.randint(1980, 2023)
    }
    
    businesses.append(business)

# Generate reviews for some businesses (randomly select about 30% of businesses)
reviews = []
review_id = 1
for business in businesses:
    if random.random() < 0.3:  # 30% chance of having reviews
        # Generate 1-5 reviews
        num_reviews = random.randint(1, 5)
        for i in range(num_reviews):
            # Generate a random date in the last year
            today = datetime.today().date()
            days_ago = random.randint(1, 365)
            review_date = today - timedelta(days=days_ago)
            
            # Generate a random rating that's close to the business's overall rating
            rating = min(5, max(1, round(business['rating'] + random.uniform(-1.0, 1.0))))
            
            # Create the review
            review = {
                'id': f'r{review_id:04d}',
                'businessId': business['id'],
                'userName': f"{random.choice(['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Jennifer'])} {random.choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}.",
                'rating': rating,
                'comment': random.choice([
                    f"Great {business['categories'][0]} service. Would recommend!",
                    f"The staff was very friendly and helpful.",
                    f"Good experience overall. Would visit again.",
                    f"Excellent service and quality.",
                    f"Decent place, but a bit overpriced.",
                    f"Amazing experience! Highly recommend {business['name']}.",
                    f"Not bad, but could be better.",
                    f"Fantastic service and atmosphere.",
                    f"Very professional and efficient.",
                    f"Loved everything about this place!"
                ]),
                'date': review_date.strftime('%Y-%m-%d')
            }
            
            reviews.append(review)
            review_id += 1

# Create categories data structure
category_counts = {}
for business in businesses:
    for category in business['categories']:
        if category in category_counts:
            category_counts[category] += 1
        else:
            category_counts[category] = 1

categories = [
    {
        'id': 'government',
        'name': 'Government Services',
        'icon': 'building-government',
        'description': 'Find government offices and public services across New York State',
        'count': category_counts.get('government', 0),
        'sponsored': True,
        'sponsorName': 'NY State Tax Department'
    },
    {
        'id': 'healthcare',
        'name': 'Healthcare',
        'icon': 'stethoscope',
        'description': 'Hospitals, clinics, doctors, and other healthcare providers',
        'count': category_counts.get('healthcare', 0)
    },
    {
        'id': 'education',
        'name': 'Education',
        'icon': 'graduation-cap',
        'description': 'Schools, colleges, universities, and educational resources',
        'count': category_counts.get('education', 0)
    },
    {
        'id': 'legal',
        'name': 'Legal & Financial',
        'icon': 'scale-balanced',
        'description': 'Lawyers, notaries, accountants, and financial services',
        'count': category_counts.get('legal', 0),
        'sponsored': True,
        'sponsorName': 'XYZ Tax Prep'
    },
    {
        'id': 'lifestyle',
        'name': 'Lifestyle',
        'icon': 'utensils',
        'description': 'Restaurants, barbers, groceries, and retail stores',
        'count': category_counts.get('lifestyle', 0)
    },
    {
        'id': 'safety',
        'name': 'Public Safety',
        'icon': 'shield',
        'description': 'Police stations, fire departments, and emergency services',
        'count': category_counts.get('safety', 0)
    },
    {
        'id': 'events',
        'name': 'Events & Attractions',
        'icon': 'ticket',
        'description': 'Museums, theaters, parks, and entertainment venues',
        'count': category_counts.get('events', 0)
    }
]

# Create locations data structure
locations = [
    {
        'id': 'manhattan',
        'name': 'Manhattan',
        'type': 'borough',
        'zipCodes': ['10001', '10002', '10003', '10004', '10005', '10006', '10007']
    },
    {
        'id': 'brooklyn',
        'name': 'Brooklyn',
        'type': 'borough',
        'zipCodes': ['11201', '11202', '11203', '11204', '11205', '11206']
    },
    {
        'id': 'queens',
        'name': 'Queens',
        'type': 'borough',
        'zipCodes': ['11101', '11102', '11103', '11104', '11105', '11106']
    },
    {
        'id': 'bronx',
        'name': 'Bronx',
        'type': 'borough',
        'zipCodes': ['10451', '10452', '10453', '10454', '10455', '10456']
    },
    {
        'id': 'staten_island',
        'name': 'Staten Island',
        'type': 'borough',
        'zipCodes': ['10301', '10302', '10303', '10304', '10305', '10306']
    }
]

# Create ads data structure
ads = [
    {
        'id': 'a001',
        'type': 'banner',
        'imageUrl': '/images/banner-ad-1.jpg',
        'linkUrl': 'https://example.com/promo1',
        'altText': 'Special offer on tax preparation services',
        'targetCategories': ['legal']
    },
    {
        'id': 'a002',
        'type': 'banner',
        'imageUrl': '/images/banner-ad-2.jpg',
        'linkUrl': 'https://example.com/promo2',
        'altText': 'Visit the new exhibit at the Metropolitan Museum',
        'targetCategories': ['events']
    },
    {
        'id': 'a003',
        'type': 'sidebar',
        'imageUrl': '/images/sidebar-ad-1.jpg',
        'linkUrl': 'https://example.com/promo3',
        'altText': 'Health insurance open enrollment',
        'targetCategories': ['healthcare']
    },
    {
        'id': 'a004',
        'type': 'sidebar',
        'imageUrl': '/images/sidebar-ad-2.jpg',
        'linkUrl': 'https://example.com/promo4',
        'altText': 'Brooklyn Restaurant Week',
        'targetCategories': ['lifestyle'],
        'targetLocations': ['brooklyn']
    }
]

# Create the data.ts file content
data_ts_content = f"""
export type Category = {{
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  sponsored?: boolean;
  sponsorName?: string;
}};

export type Location = {{
  id: string;
  name: string;
  type: 'borough' | 'neighborhood' | 'city';
  zipCodes: string[];
}};

export type Business = {{
  id: string;
  name: string;
  description: string;
  categories: string[];
  address: string;
  borough: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  hours: {{
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }};
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  coordinates: {{
    lat: number;
    lng: number;
  }};
  images: string[];
  services: string[];
  yearEstablished: number;
}};

export type Review = {{
  id: string;
  businessId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}};

export type Ad = {{
  id: string;
  type: 'banner' | 'sidebar';
  imageUrl: string;
  linkUrl: string;
  altText: string;
  targetCate<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>