import { NextResponse } from 'next/server';
import { readExcelFiles } from '@/utils/excel';
import { Business } from '@/models/Business';
import '@/utils/db';

export async function GET() {
  try {
    // Read data from Excel files
    const businesses = await readExcelFiles();
    
    // Clear existing data
    await Business.deleteMany({});
    
    // Insert new data
    await Business.insertMany(businesses);
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${businesses.length} businesses`,
      count: businesses.length
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error importing data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 