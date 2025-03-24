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
  count?: number;
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
  const [categories, setCategories] = useState<Business[]>([])

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data.map((cat: any) => ({
          ...cat,
          count: cat.businesses.length
        })));
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
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Discover New York State Businesses
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Find and connect with the best businesses across New York State. From local shops to major enterprises.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/categories"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Categories
              </Link>
              <Link
                href="/search"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Search Businesses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our curated selection of business categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <Link href={`/categories/${category._id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          {category.count}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="text-sm">View businesses</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Businesses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover top-rated businesses in New York State
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {businesses.slice(0, 6).map((business, index) => (
              <motion.div
                key={business._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <BusinessCard business={business} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Find Your Business?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Start exploring our comprehensive directory of New York State businesses today.
            </p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Search
            </Link>
          </motion.div>
        </div>
      </section>

      {error && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}
    </div>
  )
}

