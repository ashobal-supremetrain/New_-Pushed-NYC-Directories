import { NextRequest, NextResponse } from 'next/server';
import { businessController } from '@/controllers/businessController';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    await dbConnect();
    console.log('MongoDB connected successfully');

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || undefined;
    const category = searchParams.get('category') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'active';
    const isVerified = searchParams.get('verified') === 'true' ? true : undefined;

    console.log('Fetching businesses with params:', { query, category, page, limit, status, isVerified });

    const result = await businessController.getBusinesses({
      query,
      category,
      page,
      limit,
      status,
      isVerified
    });

    console.log(`Found ${result.businesses.length} businesses`);

    return NextResponse.json({
      success: true,
      data: result.businesses,
      pagination: result.pagination
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
    // Ensure database connection
    await dbConnect();
    console.log('MongoDB connected successfully');

    const body = await request.json();
    console.log('Received business data:', body);

    const business = await businessController.createBusiness(body);
    console.log('Created business:', business);

    return NextResponse.json({
      success: true,
      message: 'Business submitted successfully',
      data: business
    });
  } catch (error) {
    console.error('Error submitting business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error submitting business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 