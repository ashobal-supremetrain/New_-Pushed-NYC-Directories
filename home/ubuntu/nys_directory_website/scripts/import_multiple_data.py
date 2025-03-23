import pandas as pd
import json
import os
import re
from datetime import datetime, timedelta
import random

# Read all Excel files
file_paths = [
    '/home/ubuntu/upload/Google Maps Listings Scraper _by Keywords_.xlsx',
    '/home/ubuntu/upload/lead.xlsx',
    '/home/ubuntu/upload/lead 3.xlsx',
    '/home/ubuntu/upload/lead 4.xlsx',
    '/home/ubuntu/upload/lead 5.xlsx'
]

# Function to read and process each Excel file
def process_excel_file(file_path):
    try:
        print(f"Processing file: {file_path}")
        df = pd.read_excel(file_path)
        df = df.fillna('')  # Replace NaN values with empty strings
        return df
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return pd.DataFrame()  # Return empty DataFrame on error

# Combine all DataFrames
all_data = []
for file_path in file_paths:
    df = process_excel_file(file_path)
    if not df.empty:
        all_data.append(df)

# Combine all DataFrames if we have any data
if all_data:
    combined_df = pd.concat(all_data, ignore_index=True)
    print(f"Combined data has {len(combined_df)} rows")
else:
    print("No data was successfully processed")
    combined_df = pd.DataFrame()

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
    
    category_text = str(category_text).lower()
    keyword = str(keyword).lower() if keyword else ''
    
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
    
    address = str(address).lower()
    
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
    
    address = str(address)
    
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

# Function to safely convert any value to string
def safe_str(value):
    if value is None:
        return ''
    return str(value)

# Process the data into our format
businesses = []
for index, row in combined_df.iterrows():
    # Generate a unique ID
    business_id = f'b{index+1:04d}'
    
    # Get the category column name (might be different in different files)
    category_col = 'Category' if 'Category' in row else 'category' if 'category' in row else None
    keyword_col = 'Keyword' if 'Keyword' in row else 'keyword' if 'keyword' in row else None
    
    # Get category and keyword values
    category_text = row[category_col] if category_col and category_col in row else ''
    keyword = row[keyword_col] if keyword_col and keyword_col in row else ''
    
    # Determine category
    category = determine_category(category_text, keyword)
    
    # Get address column name
    address_col = 'Address' if 'Address' in row else 'address' if 'address' in row else None
    address = row[address_col] if address_col and address_col in row else ''
    
    # Determine borough and ZIP code
    borough = determine_borough(address)
    zip_code = extract_zip_code(address)
    
    # Get tags/services column name
    tags_col = 'Tags' if 'Tags' in row else 'tags' if 'tags' in row else None
    
    # Extract services/tags from the Tags column
    services = []
    if tags_col and tags_col in row and row[tags_col]:
        # Split tags by commas if they exist
        tags = str(row[tags_col]).split(',')
        services = [tag.strip() for tag in tags if tag.strip()]
    
    # If no services were extracted, use the category as a service
    if not services and category_text:
        services = [safe_str(category_text)]
    
    # If still no services, add a default one based on the keyword
    if not services and keyword:
        keyword_parts = safe_str(keyword).split(' in ')
        if len(keyword_parts) > 0:
            services = [keyword_parts[0]]
    
    # If still no services, add a default
    if not services:
        services = ['General Services']
    
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
    
    # Get rating and review count columns
    rating_col = 'Rating' if 'Rating' in row else 'rating' if 'rating' in row else None
    review_count_col = 'Review_count' if 'Review_count' in row else 'review_count' if 'review_count' in row else None
    
    # Clean numeric values
    try:
        review_count = clean_numeric(row[review_count_col]) if review_count_col and review_count_col in row else random.randint(5, 100)
    except:
        review_count = random.randint(5, 100)
    
    try:
        rating = float(row[rating_col]) if rating_col and rating_col in row and row[rating_col] != '' else round(random.uniform(3.0, 5.0), 1)
    except:
        rating = round(random.uniform(3.0, 5.0), 1)
    
    # Get name column
    name_col = 'Name' if 'Name' in row else 'name' if 'name' in row else None
    name = safe_str(row[name_col]) if name_col and name_col in row else f"Business {index+1}"
    
    # Get phone column
    phone_col = 'Telephone' if 'Telephone' in row else 'telephone' if 'telephone' in row else 'phone' if 'phone' in row else None
    phone = safe_str(row[phone_col]) if phone_col and phone_col in row else '(212) 555-' + str(random.randint(1000, 9999))
    
    # Get website column
    website_col = 'Website' if 'Website' in row else 'website' if 'website' in row else None
    website = safe_str(row[website_col]) if website_col and website_col in row else ''
    
    # Get coordinates columns
    lat_col = 'Latitude' if 'Latitude' in row else 'latitude' if 'latitude' in row else None
    lng_col = 'Longitude' if 'Longitude' in row else 'longitude' if 'longitude' in row else None
    
    try:
        lat = float(row[lat_col]) if lat_col and lat_col in row and row[lat_col] != '' else 40.7128
    except:
        lat = 40.7128
        
    try:
        lng = float(row[lng_col]) if lng_col and lng_col in row and row[lng_col] != '' else -74.0060
    except:
        lng = -74.0060
    
    # Create a safe business name for email
    safe_business_name = name.lower().replace(' ', '').replace('&', 'and').replace(',', '').replace('.', '').replace('-', '')
    if not safe_business_name:
        safe_business_name = f"business{index+1}"
    
    # Create the business object
    business = {
        'id': business_id,
        'name': name,
        'description': f"{name} is a {safe_str(category_text) if category_text else 'business'} located in {borough.replace('_', ' ').title()}, New York. {services[0] if services else 'Various'} services available.",
        'categories': [category],
        'address': safe_str(address),
        'borough': borough,
        'zipCode': zip_code,
        'phone': phone,
        'email': f"info@{safe_business_name}.com",
        'website': website,
        'hours': hours,
        'rating': rating,
        'reviewCount': review_count,
        'verified': is_verified,
        'featured': is_featured,
        'premium': is_premium,
        'coordinates': {
            'lat': lat,
            'lng': lng
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
        'count': category_counts.g<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>