import { NextRequest, NextResponse } from 'next/server';
import { businessController } from '@/controllers/businessController';

export async function GET(request: NextRequest) {
  try {
    const stats = await businessController.getBusinessStats();
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching business stats:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching business stats',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 