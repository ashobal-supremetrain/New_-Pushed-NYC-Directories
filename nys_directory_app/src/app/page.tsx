'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Business {
  _id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/businesses');
      const data = await response.json();
      
      if (data.success) {
        setBusinesses(data.data);
        // Extract unique categories with proper type assertion
        const uniqueCategories = Array.from(new Set(data.data.map((b: Business) => b.category)))
          .filter((category): category is string => Boolean(category))
          .slice(0, 6); // Get top 6 categories
        setCategories(uniqueCategories);
      } else {
        setError('Failed to load businesses');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/businesses?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setBusinesses(data.data);
      } else {
        setError('Failed to search businesses');
      }
    } catch (err) {
      setError('Error searching businesses');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Find Local Businesses in New York State</h1>
        <p className="text-xl mb-8">Discover and connect with businesses in your area</p>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search businesses..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Featured Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="text-gray-600">Explore local {category.toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Businesses</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 bg-white rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.slice(0, 6).map((business) => (
              <div key={business._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-4">{business.description || `Located in ${business.address}`}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    {business.rating && (
                      <span className="mr-4">⭐️ {business.rating.toFixed(1)}/5</span>
                    )}
                    <span>📍 {business.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Own a Business?</h2>
        <p className="text-xl text-gray-600 mb-8">Join our directory and reach more customers</p>
        <Link
          href="/submit"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700"
        >
          List Your Business
        </Link>
      </section>
    </div>
  )
}

