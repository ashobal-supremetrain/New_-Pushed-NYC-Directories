export const businessCategories = [
  {
    id: 'government',
    name: 'Government Services',
    description: 'Find local government offices, DMV locations, post offices, and other public services.',
    image: '/images/manhattan_contrasts.jpeg',
    count: 124
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Hospitals, clinics, doctors, pharmacies, and other medical services in New York State.',
    image: '/images/nyc_skyline_sunset.jpeg',
    count: 356
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Schools, universities, libraries, tutoring services, and educational resources.',
    image: '/images/empire_state_sunset.jpeg',
    count: 218
  },
  {
    id: 'legal',
    name: 'Legal & Financial',
    description: 'Lawyers, notaries, accountants, tax services, and financial advisors.',
    image: '/images/manhattan_contrasts.jpeg',
    count: 189
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Restaurants, cafes, grocery stores, barbers, salons, and retail shops.',
    image: '/images/nyc_skyline_sunset.jpeg',
    count: 472
  },
  {
    id: 'safety',
    name: 'Public Safety',
    description: 'Police stations, fire departments, emergency services, and safety resources.',
    image: '/images/empire_state_sunset.jpeg',
    count: 95
  },
  {
    id: 'events',
    name: 'Events & Attractions',
    description: 'Museums, theaters, parks, tourist attractions, and event venues.',
    image: '/images/manhattan_contrasts.jpeg',
    count: 263
  }
];

export const featuredListings = [
  {
    id: 'nyc-city-hall',
    name: 'NYC City Hall',
    category: 'government',
    address: '22 Cortlandt St, New York, NY 10007',
    phone: '(212) 566-5000',
    website: 'https://www1.nyc.gov/site/cityhal/index.page',
    description: 'The official seat of New York City government, housing the office of the Mayor and the chambers of the New York City Council.',
    image: '/images/manhattan_contrasts.jpeg',
    featured: true,
    rating: 4.2,
    reviews: 128
  },
  {
    id: 'nyu-langone',
    name: 'NYU Langone Medical Center',
    category: 'healthcare',
    address: '550 1st Avenue, New York, NY 10016',
    phone: '(212) 263-7300',
    website: 'https://nyulangone.org',
    description: 'One of the nation\'s premier academic medical centers dedicated to patient care, education, and research.',
    image: '/images/nyc_skyline_sunset.jpeg',
    featured: true,
    rating: 4.7,
    reviews: 356
  },
  {
    id: 'columbia-university',
    name: 'Columbia University',
    category: 'education',
    address: '116th St & Broadway, New York, NY 10027',
    phone: '(212) 854-1754',
    website: 'https://www.columbia.edu',
    description: 'A private Ivy League research university in New York City, established in 1754 as King\'s College.',
    image: '/images/empire_state_sunset.jpeg',
    featured: true,
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'ny-public-library',
    name: 'New York Public Library',
    category: 'education',
    address: '476 5th Ave, New York, NY 10018',
    phone: '(917) 275-6975',
    website: 'https://www.nypl.org',
    description: 'The New York Public Library is one of the largest public libraries in the world, with 92 locations across the Bronx, Manhattan, and Staten Island.',
    image: '/images/manhattan_contrasts.jpeg',
    featured: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: 'empire-state-building',
    name: 'Empire State Building',
    category: 'events',
    address: '20 W 34th St, New York, NY 10001',
    phone: '(212) 736-3100',
    website: 'https://www.esbnyc.com',
    description: 'A 102-story Art Deco skyscraper in Midtown Manhattan, offering spectacular views from its observation decks.',
    image: '/images/empire_state_sunset.jpeg',
    featured: true,
    rating: 4.7,
    reviews: 587
  }
];

export const recentListings = [
  {
    id: 'central-park',
    name: 'Central Park',
    category: 'events',
    address: 'Central Park, New York, NY',
    phone: '(212) 310-6600',
    website: 'https://www.centralparknyc.org',
    description: 'An urban park in Manhattan spanning 843 acres between the Upper West and Upper East Sides.',
    image: '/images/nyc_skyline_sunset.jpeg',
    featured: false,
    rating: 4.9,
    reviews: 892
  },
  {
    id: 'nypd-headquarters',
    name: 'NYPD Headquarters',
    category: 'safety',
    address: '1 Police Plaza, New York, NY 10038',
    phone: '(646) 610-5000',
    website: 'https://www1.nyc.gov/site/nypd/index.page',
    description: 'The headquarters of the New York City Police Department, the largest municipal police force in the United States.',
    image: '/images/manhattan_contrasts.jpeg',
    featured: false,
    rating: 4.1,
    reviews: 76
  },
  {
    id: 'chase-bank-midtown',
    name: 'Chase Bank - Midtown Branch',
    category: 'legal',
    address: '1 Chase Manhattan Plaza, New York, NY 10005',
    phone: '(212) 552-2222',
    website: 'https://www.chase.com',
    description: 'Full-service banking center offering personal and business financial services.',
    image: '/images/empire_state_sunset.jpeg',
    featured: false,
    rating: 4.0,
    reviews: 124
  },
  {
    id: 'katz-deli',
    name: 'Katz\'s Delicatessen',
    category: 'lifestyle',
    address: '205 E Houston St, New York, NY 10002',
    phone: '(212) 254-2246',
    website: 'https://katzsdelicatessen.com',
    description: 'Famous deli known for its pastrami sandwiches, opened in 1888 and featured in numerous films.',
    image: '/images/nyc_skyline_sunset.jpeg',
    featured: false,
    rating: 4.6,
    reviews: 456
  }
];

export const boroughs = [
  {
    id: 'manhattan',
    name: 'Manhattan',
    count: 845,
    image: '/images/manhattan_contrasts.jpeg'
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    count: 723,
    image: '/images/nyc_skyline_sunset.jpeg'
  },
  {
    id: 'queens',
    name: 'Queens',
    count: 612,
    image: '/images/empire_state_sunset.jpeg'
  },
  {
    id: 'bronx',
    name: 'Bronx',
    count: 384,
    image: '/images/manhattan_contrasts.jpeg'
  },
  {
    id: 'staten-island',
    name: 'Staten Island',
    count: 216,
    image: '/images/nyc_skyline_sunset.jpeg'
  }
];
