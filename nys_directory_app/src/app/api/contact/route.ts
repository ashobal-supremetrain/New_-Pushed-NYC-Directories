import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = db.collection('contact_messages')

    // Create new contact message document
    const contactMessage = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      status: 'new' // Messages start as new
    }

    // Insert the message
    await collection.insertOne(contactMessage)

    // Here you would typically also send an email notification
    // For now, we'll just log it
    console.log('New contact message received:', {
      name,
      email,
      subject,
      message
    })

    return NextResponse.json({
      success: true,
      message: 'Message received successfully'
    })
  } catch (error) {
    console.error('Error processing contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 