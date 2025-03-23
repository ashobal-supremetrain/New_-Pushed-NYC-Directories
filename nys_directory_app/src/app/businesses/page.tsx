'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import BusinessCard from '@/components/BusinessCard'
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

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BusinessesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [nearMe, setNearMe] = useState(searchParams.get('nearMe') === 'true')
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  // Get user's location
  useEffect(() => {
    if (nearMe && !userLocation) {
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
            setError('Unable to get your location. Please enable location services.')
          }
        )
      } else {
        setError('Geolocation is not supported by your browser.')
      }
    }
  }, [nearMe, userLocation])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        
        if (data.success) {
          setCategories(data.data)
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('page', searchParams.get('page') || '1')
        params.append('limit', '12')
        
        if (searchQuery) {
          params.append('search', searchQuery)
        }
        if (category) {
          params.append('category', category)
        }
        if (nearMe && userLocation) {
          params.append('nearMe', 'true')
          params.append('lat', userLocation.lat.toString())
          params.append('lon', userLocation.lon.toString())
        }

        const response = await fetch(`/api/businesses?${params.toString()}`)
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch businesses')
        }

        setBusinesses(data.data)
        setPagination(data.pagination)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching businesses')
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [searchParams, searchQuery, category, nearMe, userLocation])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('search', searchQuery)
    if (category) params.append('category', category)
    if (nearMe) params.append('nearMe', 'true')
    router.push(`/businesses?${params.toString()}`)
  }

  const handleNearMeToggle = () => {
    setNearMe(!nearMe)
    if (!nearMe) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('nearMe', 'true')
      router.push(`/businesses?${params.toString()}`)
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('nearMe')
      router.push(`/businesses?${params.toString()}`)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Businesses</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search businesses..."
            className="flex-1 p-2 border rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleNearMeToggle}
            className={`px-4 py-2 rounded ${
              nearMe
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {nearMe ? 'Near Me ✓' : 'Near Me'}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Business Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div key={business._id} className="relative">
            <BusinessCard business={business} />
            {business.distance && (
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm shadow">
                {formatDistance(business.distance)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(pagination.totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('page', (i + 1).toString())
                router.push(`/businesses?${params.toString()}`)
              }}
              className={`px-4 py-2 rounded ${
                pagination.page === i + 1
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 