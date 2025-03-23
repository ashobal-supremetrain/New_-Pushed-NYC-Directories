'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import BusinessMap from '@/components/BusinessMap'
import { formatDistance } from '@/lib/utils'

interface Business {
  _id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  status: string;
  distance?: number;
}

export default function BusinessDetailsPage() {
  const params = useParams()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }

    // Fetch business details
    const fetchBusiness = async () => {
      try {
        setLoading(true)
        const queryParams = new URLSearchParams()
        if (userLocation) {
          queryParams.append('lat', userLocation.lat.toString())
          queryParams.append('lon', userLocation.lon.toString())
        }
        const response = await fetch(`/api/businesses/${params.id}?${queryParams.toString()}`)
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch business details')
        }

        setBusiness(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching business details')
      } finally {
        setLoading(false)
      }
    }

    fetchBusiness()
  }, [params.id, userLocation])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Business not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
            {business.status === 'verified' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              {business.rating.toFixed(1)}
              <span className="ml-1">({business.reviews} reviews)</span>
            </span>
            {business.distance && (
              <span>{formatDistance(business.distance)} away</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{business.description}</p>

              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span> {business.address}
                </p>
                {business.phone && (
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {business.phone}
                  </p>
                )}
                {business.email && (
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {business.email}
                  </p>
                )}
                {business.website && (
                  <p className="text-gray-600">
                    <span className="font-medium">Website:</span>{' '}
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Map */}
            <BusinessMap
              address={business.address}
              latitude={business.latitude}
              longitude={business.longitude}
              userLocation={userLocation || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 