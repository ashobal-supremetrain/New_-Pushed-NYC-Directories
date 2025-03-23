'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BusinessCard from '@/components/BusinessCard'
import LoadingSpinner from '@/components/LoadingSpinner'

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data.map((cat: any) => cat.name));
      } else {
        setError('Failed to load categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/businesses?page=1&limit=6');
      const data = await response.json();
      
      if (data.success) {
        setBusinesses(data.data.businesses || []);
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
    if (!searchQuery.trim()) {
      fetchBusinesses();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const searchResponse = await fetch(`/api/businesses?search=${encodeURIComponent(searchQuery)}&page=1&limit=6`);
      const data = await searchResponse.json();
      
      if (data.success) {
        setBusinesses(data.data.businesses || []);
        if (data.data.businesses.length === 0) {
          setError('No businesses found matching your search.');
        }
      } else {
        setError(data.error || 'Failed to search businesses');
      }
    } catch (err) {
      setError('Error searching businesses');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Local Businesses in New York State</h1>
          <p className="text-xl mb-8">Discover and connect with businesses in your area</p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }} className="flex gap-4">
              <input
                type="text"
                placeholder="Search businesses..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category} 
                href={`/categories/${encodeURIComponent(category)}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </h3>
                <p className="text-gray-600">
                  Browse {category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} businesses in New York State
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Featured Businesses */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Businesses</h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.isArray(businesses) && businesses.slice(0, 6).map((business) => (
                <motion.div
                  key={business._id}
                  variants={item}
                >
                  <BusinessCard business={business} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-50 p-12 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Own a Business?</h2>
          <p className="text-xl text-gray-600 mb-8">Join our directory and reach more customers</p>
          <Link
            href="/submit"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700"
          >
            List Your Business
          </Link>
        </div>
      </section>
    </div>
  )
}

