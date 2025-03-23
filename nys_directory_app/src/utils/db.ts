import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nys_directory';

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI);
}

export default mongoose; 