import dbConnect from '../lib/db';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    const mongoose = await dbConnect();
    console.log('Successfully connected to MongoDB!');
    console.log('Connection details:', {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      port: mongoose.connection.port,
      models: Object.keys(mongoose.models)
    });
    process.exit(0);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

testConnection(); 