import mongoose, { Document, Schema } from 'mongoose';

export interface IBusiness extends Document {
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
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  status: 'pending' | 'active' | 'suspended';
}

const businessSchema = new Schema<IBusiness>({
  name: { 
    type: String, 
    required: [true, 'Business name is required'],
    trim: true,
    minlength: [2, 'Business name must be at least 2 characters long']
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    lowercase: true,
    trim: true
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true
  },
  phone: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^\+?[\d\s-()]+$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  email: { 
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  website: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be longer than 1000 characters']
  },
  rating: { 
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5']
  },
  reviews: { 
    type: Number,
    min: [0, 'Number of reviews cannot be negative']
  },
  latitude: {
    type: Number,
    min: [-90, 'Latitude must be between -90 and 90'],
    max: [90, 'Latitude must be between -90 and 90']
  },
  longitude: {
    type: Number,
    min: [-180, 'Longitude must be between -180 and 180'],
    max: [180, 'Longitude must be between -180 and 180']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create indexes
businessSchema.index({ name: 'text', description: 'text', category: 'text' });
businessSchema.index({ category: 1 });
businessSchema.index({ status: 1 });
businessSchema.index({ createdAt: -1 });
businessSchema.index({ rating: -1 });

// Update timestamps on save
businessSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Business = mongoose.models.Business || mongoose.model<IBusiness>('Business', businessSchema); 