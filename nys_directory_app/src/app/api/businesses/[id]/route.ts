import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { calculateDistance } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const { db } = await connectToDatabase();
    const collection = db.collection('businesses');

    // Convert string ID to MongoDB ObjectId
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid business ID' },
        { status: 400 }
      );
    }

    const business = await collection.findOne({ _id: objectId });

    if (!business) {
      return NextResponse.json(
        { success: false, error: 'Business not found' },
        { status: 404 }
      );
    }

    // Calculate distance if user location is provided
    if (lat && lon) {
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lon),
        business.latitude,
        business.longitude
      );
      business.distance = distance;
    }

    return NextResponse.json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('businesses');

    // Convert string ID to MongoDB ObjectId
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid business ID' },
        { status: 400 }
      );
    }

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: { ...body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Business not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('businesses');

    // Convert string ID to MongoDB ObjectId
    let objectId: ObjectId;
    try {
      objectId = new ObjectId(params.id);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid business ID' },
        { status: 400 }
      );
    }

    const result = await collection.findOneAndDelete({ _id: objectId });

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Business not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error deleting business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 