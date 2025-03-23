export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  sponsored?: boolean;
  sponsorName?: string;
};

export type Location = {
  id: string;
  name: string;
  type: 'borough' | 'neighborhood' | 'city';
  zipCodes: string[];
};

export type Business = {
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
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  services: string[];
  yearEstablished: number;
};

export type Review = {
  id: string;
  businessId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Ad = {
  id: string;
  type: 'banner' | 'sidebar';
  imageUrl: string;
  linkUrl: string;
  altText: string;
  targetCategories?: string[];
  targetLocations?: string[];
};

// Sample data
export const categories: Category[] = [
  {
    id: 'government',
    name: 'Government Services',
    icon: 'building-government',
    description: 'Find government offices and public services across New York State',
    count: 245,
    sponsored: true,
    sponsorName: 'NY State Tax Department'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'stethoscope',
    description: 'Hospitals, clinics, doctors, and other healthcare providers',
    count: 532
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'graduation-cap',
    description: 'Schools, colleges, universities, and educational resources',
    count: 378
  },
  {
    id: 'legal',
    name: 'Legal & Financial',
    icon: 'scale-balanced',
    description: 'Lawyers, notaries, accountants, and financial services',
    count: 421,
    sponsored: true,
    sponsorName: 'XYZ Tax Prep'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: 'utensils',
    description: 'Restaurants, barbers, groceries, and retail stores',
    count: 1245
  },
  {
    id: 'safety',
    name: 'Public Safety',
    icon: 'shield',
    description: 'Police stations, fire departments, and emergency services',
    count: 187
  },
  {
    id: 'events',
    name: 'Events & Attractions',
    icon: 'ticket',
    description: 'Museums, theaters, parks, and entertainment venues',
    count: 312
  }
];

export const locations: Location[] = [
  {
    id: 'manhattan',
    name: 'Manhattan',
    type: 'borough',
    zipCodes: ['10001', '10002', '10003', '10004', '10005', '10006', '10007']
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    type: 'borough',
    zipCodes: ['11201', '11202', '11203', '11204', '11205', '11206']
  },
  {
    id: 'queens',
    name: 'Queens',
    type: 'borough',
    zipCodes: ['11101', '11102', '11103', '11104', '11105', '11106']
  },
  {
    id: 'bronx',
    name: 'Bronx',
    type: 'borough',
    zipCodes: ['10451', '10452', '10453', '10454', '10455', '10456']
  },
  {
    id: 'staten_island',
    name: 'Staten Island',
    type: 'borough',
    zipCodes: ['10301', '10302', '10303', '10304', '10305', '10306']
  }
];

export const businesses: Business[] = [
  {
    id: 'b001',
    name: 'City Hall',
    description: 'The official seat of New York City government, housing the office of the Mayor and the City Council chambers.',
    categories: ['government'],
    address: '1 Centre St, New York, NY',
    borough: 'manhattan',
    zipCode: '10007',
    phone: '(212) 555-1234',
    email: 'info@cityhall.nyc.gov',
    website: 'https://www1.nyc.gov/site/cityhall/index.page',
    hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    rating: 4.2,
    reviewCount: 156,
    verified: true,
    featured: true,
    premium: true,
    coordinates: {
      lat: 40.7127,
      lng: -74.0059
    },
    images: ['/images/city-hall.jpg'],
    services: ['Marriage licenses', 'Birth certificates', 'Public meetings', 'City services'],
    yearEstablished: 1812
  },
  {
    id: 'b002',
    name: 'NYS Department of Motor Vehicles',
    description: 'Official New York State DMV office providing driver licensing, vehicle registration, and other motor vehicle services.',
    categories: ['government'],
    address: '366 W 31st St, New York, NY',
    borough: 'manhattan',
    zipCode: '10001',
    phone: '(212) 555-2345',
    email: 'info@dmv.ny.gov',
    website: 'https://dmv.ny.gov',
    hours: {
      monday: '8:30 AM - 4:00 PM',
      tuesday: '8:30 AM - 4:00 PM',
      wednesday: '8:30 AM - 4:00 PM',
      thursday: '8:30 AM - 4:00 PM',
      friday: '8:30 AM - 4:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    rating: 3.1,
    reviewCount: 423,
    verified: true,
    featured: false,
    premium: false,
    coordinates: {
      lat: 40.7509,
      lng: -73.9937
    },
    images: ['/images/dmv.jpg'],
    services: ['Driver licenses', 'Vehicle registration', 'ID cards', 'License plates'],
    yearEstablished: 1959
  },
  {
    id: 'b003',
    name: 'Mount Sinai Hospital',
    description: 'Leading medical center providing exceptional patient care, conducting innovative research, and training future healthcare professionals.',
    categories: ['healthcare'],
    address: '1 Gustave L. Levy Pl, New York, NY',
    borough: 'manhattan',
    zipCode: '10029',
    phone: '(212) 555-3456',
    email: 'info@mountsinai.org',
    website: 'https://www.mountsinai.org',
    hours: {
      monday: 'Open 24 hours',
      tuesday: 'Open 24 hours',
      wednesday: 'Open 24 hours',
      thursday: 'Open 24 hours',
      friday: 'Open 24 hours',
      saturday: 'Open 24 hours',
      sunday: 'Open 24 hours'
    },
    rating: 4.5,
    reviewCount: 782,
    verified: true,
    featured: true,
    premium: true,
    coordinates: {
      lat: 40.7900,
      lng: -73.9526
    },
    images: ['/images/mount-sinai.jpg'],
    services: ['Emergency care', 'Primary care', 'Specialized medicine', 'Surgery', 'Diagnostic services'],
    yearEstablished: 1852
  },
  {
    id: 'b004',
    name: 'Columbia University',
    description: 'Prestigious Ivy League research university offering undergraduate, graduate, and professional degrees across various disciplines.',
    categories: ['education'],
    address: '116th St & Broadway, New York, NY',
    borough: 'manhattan',
    zipCode: '10027',
    phone: '(212) 555-4567',
    email: 'info@columbia.edu',
    website: 'https://www.columbia.edu',
    hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'By appointment',
      sunday: 'By appointment'
    },
    rating: 4.7,
    reviewCount: 521,
    verified: true,
    featured: false,
    premium: true,
    coordinates: {
      lat: 40.8075,
      lng: -73.9626
    },
    images: ['/images/columbia.jpg'],
    services: ['Undergraduate programs', 'Graduate programs', 'Research', 'Libraries', 'Student services'],
    yearEstablished: 1754
  },
  {
    id: 'b005',
    name: 'Johnson & Associates Law Firm',
    description: 'Full-service law firm specializing in personal injury, family law, real estate, and business litigation.',
    categories: ['legal'],
    address: '350 5th Ave, New York, NY',
    borough: 'manhattan',
    zipCode: '10118',
    phone: '(212) 555-5678',
    email: 'info@johnsonlaw.com',
    website: 'https://www.johnsonlaw.com',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'By appointment',
      sunday: 'Closed'
    },
    rating: 4.3,
    reviewCount: 187,
    verified: true,
    featured: true,
    premium: true,
    coordinates: {
      lat: 40.7484,
      lng: -73.9857
    },
    images: ['/images/law-firm.jpg'],
    services: ['Personal injury', 'Family law', 'Real estate law', 'Business litigation', 'Estate planning'],
    yearEstablished: 1985
  },
  {
    id: 'b006',
    name: 'Brooklyn Brewery',
    description: 'Craft brewery offering tours, tastings, and a wide selection of locally brewed beers in a historic warehouse setting.',
    categories: ['lifestyle', 'events'],
    address: '79 N 11th St, Brooklyn, NY',
    borough: 'brooklyn',
    zipCode: '11249',
    phone: '(718) 555-6789',
    email: 'info@brooklynbrewery.com',
    website: 'https://brooklynbrewery.com',
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 11:00 PM',
      wednesday: '5:00 PM - 11:00 PM',
      thursday: '5:00 PM - 11:00 PM',
      friday: '5:00 PM - 12:00 AM',
      saturday: '12:00 PM - 12:00 AM',
      sunday: '12:00 PM - 8:00 PM'
    },
    rating: 4.6,
    reviewCount: 892,
    verified: true,
    featured: false,
    premium: true,
    coordinates: {
      lat: 40.7216,
      lng: -73.9577
    },
    images: ['/images/brewery.jpg'],
    services: ['Brewery tours', 'Beer tastings', 'Events', 'Merchandise', 'Food vendors'],
    yearEstablished: 1988
  },
  {
    id: 'b007',
    name: 'FDNY Engine 54',
    description: 'New York City Fire Department station serving the community with emergency response and fire prevention services.',
    categories: ['safety'],
    address: '782 8th Ave, New York, NY',
    borough: 'manhattan',
    zipCode: '10036',
    phone: '(212) 555-7890',
    email: 'info@fdny.nyc.gov',
    website: 'https://www1.nyc.gov/site/fdny/index.page',
    hours: {
      monday: 'Open 24 hours',
      tuesday: 'Open 24 hours',
      wednesday: 'Open 24 hours',
      thursday: 'Open 24 hours',
      friday: 'Open 24 hours',
      saturday: 'Open 24 hours',
      sunday: 'Open 24 hours'
    },
    rating: 4.9,
    reviewCount: 124,
    verified: true,
    featured: false,
    premium: false,
    coordinates: {
      lat: 40.7608,
      lng: -73.9896
    },
    images: ['/images/fdny.jpg'],
    services: ['Emergency response', 'Fire prevention', 'Community outreach', 'Safety education'],
    yearEstablished: 1865
  },
  {
    id: 'b008',
    name: 'Metropolitan Museum of Art',
    description: 'One of the world\'s largest and finest art museums, with a collection spanning 5,000 years of world culture.',
    categories: ['events'],
    address: '1000 5th Ave, New York, NY',
    borough: 'manhattan',
    zipCode: '10028',
    phone: '(212) 555-8901',
    email: 'info@metmuseum.org',
    website: 'https://www.metmuseum.org',
    hours: {
      monday: '10:00 AM - 5:30 PM',
      tuesday: '10:00 AM - 5:30 PM',
      wednesday: '10:00 AM - 5:30 PM',
      thursday: '10:00 AM - 5:30 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '10:00 AM - 5:30 PM'
    },
    rating: 4.8,
    reviewCount: 1243,
    verified: true,
    featured: true,
    premium: true,
    coordinates: {
      lat: 40.7794,
      lng: -73.9632
    },
    images: ['/images/met.jpg'],
    services: ['Art exhibitions', 'Guided tours', 'Educational programs', 'Gift shop', 'Dining'],
    yearEstablished: 1870
  }
];

export const reviews: Review[] = [
  {
    id: 'r001',
    businessId: 'b001',
    userName: 'John D.',
    rating: 4,
    comment: 'Very helpful staff at the information desk. Got my permit questions answered quickly.',
    date: '2023-11-15'
  },
  {
    id: 'r002',
    businessId: 'b001',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Beautiful historic building. Tours are informative and the architecture is stunning.',
    date: '2023-10-22'
  },
  {
    id: 'r003',
    businessId: 'b002',
    userName: 'Michael R.',
    rating: 2,
    comment: 'Long wait times even with an appointment. Staff was professional but the system is inefficient.',
    date: '2023-12-05'
  },
  {
    id: 'r004',
    businessId: 'b003',
    userName: 'Emily L.',
    rating: 5,
    comment: 'Excellent care during my stay. The nurses were attentive and the doctors were thorough.',
    date: '2023-09-18'
  },
  {
    id: 'r005',
    businessId: 'b005',
    userName: 'Robert J.',
    rating: 4,
    comment: 'Mr. Johnson handled my case professionally and got me a fair settlement. Would recommend.',
    date: '2023-11-30'
  }
];

export const ads: Ad[] = [
  {
    id: 'a001',
    type: 'banner',
    imageUrl: '/images/banner-ad-1.jpg',
    linkUrl: 'https://example.com/promo1',
    altText: 'Special offer on tax preparation services',
    targetCategories: ['legal']
  },
  {
    id: 'a002',
    type: 'banner',
    imageUrl: '/images/banner-ad-2.jpg',
    linkUrl: 'https://example.com/promo2',
    altText: 'Visit the new exhibit at the Metropolitan Museum',
    targetCategories: ['events']
  },
  {
    id: 'a003',
    type: 'sidebar',
    imageUrl: '/images/sidebar-ad-1.jpg',
    linkUrl: 'https://example.com/promo3',
    altText: 'Health insurance open enrollment',
    targetCategories: ['healthcare']
  },
  {
    id: 'a004',
    type: 'sidebar',
    imageUrl: '/images/sidebar-ad-2.jpg',
    linkUrl: 'https://example.com/promo4',
    altText: 'Brooklyn Restaurant Week',
    targetCategories: ['lifestyle'],
    targetLocations: ['brooklyn']
  }
];

// Helper functions
export function getBusinessesByCategory(categoryId: string): Business[] {
  return businesses.filter(business => business.categories.includes(categoryId));
}

export function getBusinessById(id: string): Business | undefined {
  return businesses.find(business => business.id === id);
}

export function getReviewsByBusinessId(businessId: string): Review[] {
  return reviews.filter(review => review.businessId === businessId);
}

export function getAdsByType(type: 'banner' | 'sidebar'): Ad[] {
  return ads.filter(ad => ad.type === type);
}

export function getAdsByCategory(categoryId: string): Ad[] {
  return ads.filter(ad => !ad.targetCategories || ad.targetCategories.includes(categoryId));
}

export function getFeaturedBusinesses(): Business[] {
  return businesses.filter(business => business.featured);
}

export function searchBusinesses(query: string, categoryId?: string, locationId?: string): Business[] {
  query = query.toLowerCase();
  
  return businesses.filter(business => {
    const matchesQuery = query === '' || 
      business.name.toLowerCase().includes(query) || 
      business.description.toLowerCase().includes(query) ||
      business.services.some(service => service.toLowerCase().includes(query));
    
    const matchesCategory = !categoryId || business.categories.includes(categoryId);
    
    const matchesLocation = !locationId || business.borough === locationId;
    
    return matchesQuery && matchesCategory && matchesLocation;
  });
}
