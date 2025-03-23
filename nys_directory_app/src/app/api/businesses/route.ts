import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { calculateDistance } from '@/lib/utils';

const ITEMS_PER_PAGE = 10;

// Function to normalize category for querying
function normalizeCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const { db } = await connectToDatabase();
    const collection = db.collection('businesses');

    // Build query
    const query: any = { status: 'active' };
    if (category) {
      const normalizedCategory = normalizeCategory(category);
      query.category = normalizedCategory;
    }
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
        { address: { $regex: new RegExp(search, 'i') } }
      ];
    }

    // Get total count for pagination
    const totalCount = await collection.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

    // Adjust page number if it exceeds total pages
    const validatedPage = Math.min(page, totalPages);

    // Fetch businesses with pagination
    let businesses = await collection
      .find(query)
      .sort({ name: 1 })
      .skip((validatedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    // Calculate distances if user location is provided
    if (lat && lon) {
      businesses = businesses.map(business => {
        const distance = calculateDistance(
          parseFloat(lat),
          parseFloat(lon),
          business.latitude,
          business.longitude
        );
        return { ...business, distance };
      });

      // Sort by distance if location is provided
      businesses.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return NextResponse.json({
      success: true,
      data: {
        businesses,
        pagination: {
          currentPage: validatedPage,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: ITEMS_PER_PAGE,
          hasNextPage: validatedPage < totalPages,
          hasPrevPage: validatedPage > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching businesses',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('businesses');

    // Validate required fields
    const requiredFields = ['name', 'category', 'address', 'latitude', 'longitude'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Add metadata
    const newBusiness = {
      ...body,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newBusiness);
    const insertedBusiness = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json({
      success: true,
      data: insertedBusiness
    });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 