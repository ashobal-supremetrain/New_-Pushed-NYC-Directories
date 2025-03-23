import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

const categoryDescriptions: { [key: string]: string } = {
  'restaurants': 'Find local dining spots, from casual eateries to fine dining establishments',
  'retail': 'Discover retail stores offering various products and services',
  'healthcare': 'Access medical facilities, clinics, and healthcare providers',
  'education': 'Explore educational institutions and learning centers',
  'professional-services': 'Connect with legal, financial, and business service providers',
  'automotive': 'Find auto repair shops, dealerships, and car services',
  'beauty': 'Discover salons, spas, and beauty service providers',
  'fitness': 'Explore gyms, fitness centers, and wellness facilities',
  'entertainment': 'Find entertainment venues and recreational activities',
  'home-services': 'Access home repair, maintenance, and improvement services'
}

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('businesses')

    // Aggregate categories with counts
    const categoriesWithCounts = await collection.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: { $toLower: '$category' },
          count: { $sum: 1 },
          displayName: { $first: '$category' }
        }
      },
      { $sort: { displayName: 1 } }
    ]).toArray()

    // Format categories with descriptions and counts
    const formattedCategories = categoriesWithCounts.map(cat => {
      const categoryKey = cat._id.toLowerCase().replace(/\s+/g, '-')
      return {
        id: categoryKey,
        name: cat.displayName,
        description: categoryDescriptions[categoryKey] || `Explore ${cat.displayName.toLowerCase()} businesses in your area`,
        count: cat.count
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedCategories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching categories',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 