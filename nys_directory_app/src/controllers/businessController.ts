import { Business, IBusiness } from '@/models/Business';
import dbConnect from '@/lib/db';

export interface SearchParams {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
  status?: string;
  isVerified?: boolean;
}

export interface BusinessStats {
  total: number;
  verified: number;
  categories: { [key: string]: number };
  averageRating: number;
}

class BusinessController {
  // Get businesses with filtering and pagination
  async getBusinesses(params: SearchParams) {
    await dbConnect();
    const {
      query,
      category,
      page = 1,
      limit = 10,
      status = 'active',
      isVerified
    } = params;

    const filter: any = { status };

    if (isVerified !== undefined) {
      filter.isVerified = isVerified;
    }

    if (query) {
      filter.$text = { $search: query };
    }

    if (category) {
      filter.category = category.toLowerCase();
    }

    const skip = (page - 1) * limit;

    const businesses = await Business.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ rating: -1, createdAt: -1 });

    const total = await Business.countDocuments(filter);

    return {
      businesses,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get a single business by ID
  async getBusinessById(id: string) {
    await dbConnect();
    const business = await Business.findById(id);
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }

  // Create a new business
  async createBusiness(data: Partial<IBusiness>) {
    await dbConnect();
    const business = new Business({
      ...data,
      status: 'pending',
      isVerified: false
    });
    await business.save();
    return business;
  }

  // Update a business
  async updateBusiness(id: string, data: Partial<IBusiness>) {
    await dbConnect();
    const business = await Business.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }

  // Delete a business
  async deleteBusiness(id: string) {
    await dbConnect();
    const business = await Business.findByIdAndDelete(id);
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }

  // Get business statistics
  async getBusinessStats(): Promise<BusinessStats> {
    await dbConnect();
    const [
      total,
      verified,
      categoryCounts,
      ratingStats
    ] = await Promise.all([
      Business.countDocuments({ status: 'active' }),
      Business.countDocuments({ status: 'active', isVerified: true }),
      Business.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Business.aggregate([
        { $match: { status: 'active', rating: { $exists: true } } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ])
    ]);

    const categories: { [key: string]: number } = {};
    categoryCounts.forEach((item: { _id: string; count: number }) => {
      categories[item._id] = item.count;
    });

    return {
      total,
      verified,
      categories,
      averageRating: ratingStats[0]?.avgRating || 0
    };
  }

  // Verify a business
  async verifyBusiness(id: string) {
    await dbConnect();
    const business = await Business.findByIdAndUpdate(
      id,
      { 
        isVerified: true, 
        status: 'active',
        updatedAt: new Date()
      },
      { new: true }
    );
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }

  // Update business status
  async updateBusinessStatus(id: string, status: 'pending' | 'active' | 'suspended') {
    await dbConnect();
    const business = await Business.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }
}

export const businessController = new BusinessController(); 