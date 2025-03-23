'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
  }

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

      {/* Featured Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Restaurants',
            'Healthcare',
            'Professional Services',
            'Retail',
            'Entertainment',
            'Home Services'
          ].map((category) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((business) => (
            <div key={business} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for business image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image Placeholder
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Business Name {business}</h3>
                <p className="text-gray-600 mb-4">Short description of the business goes here...</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">⭐️ 4.5/5</span>
                  <span>📍 New York, NY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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