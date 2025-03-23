import { NextRequest, NextResponse } from 'next/server';
import { businessController } from '@/controllers/businessController';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const business = await businessController.getBusinessById(params.id);
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
      { status: error instanceof Error && error.message === 'Business not found' ? 404 : 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const business = await businessController.updateBusiness(params.id, body);
    return NextResponse.json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Error updating business:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating business',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: error instanceof Error && error.message === 'Business not found' ? 404 : 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await businessController.deleteBusiness(params.id);
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
      { status: error instanceof Error && error.message === 'Business not found' ? 404 : 500 }
    );
  }
} 