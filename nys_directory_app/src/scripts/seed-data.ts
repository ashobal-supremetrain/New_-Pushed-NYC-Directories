import mongoose from 'mongoose';
import { Business } from '../models/Business';

const sampleBusinesses = [
  {
    name: "Joe's Diner",
    category: "Restaurant",
    address: "123 Main St, Albany, NY 12210",
    phone: "(518) 555-0123",
    email: "joes@example.com",
    website: "https://joesdiner.com",
    description: "Classic American diner serving breakfast, lunch, and dinner.",
    rating: 4.5,
    reviews: 128,
    isVerified: true,
    status: "active"
  },
  {
    name: "Tech Solutions Inc",
    category: "Technology",
    address: "456 Innovation Ave, Buffalo, NY 14202",
    phone: "(716) 555-0456",
    email: "info@techsolutions.com",
    website: "https://techsolutions.com",
    description: "IT consulting and software development services.",
    rating: 4.8,
    reviews: 256,
    isVerified: true,
    status: "active"
  },
  {
    name: "Green Earth Market",
    category: "Retail",
    address: "789 Nature Blvd, Syracuse, NY 13202",
    phone: "(315) 555-0789",
    email: "info@greenearth.com",
    website: "https://greenearth.com",
    description: "Organic grocery store and natural products.",
    rating: 4.3,
    reviews: 89,
    isVerified: true,
    status: "active"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nys_directory');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Business.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const insertedBusinesses = await Business.insertMany(sampleBusinesses);
    console.log(`Inserted ${insertedBusinesses.length} businesses`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 