'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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

export default function CategoryPage() {
  const params = useParams()
  const category = typeof params.category === 'string' ? params.category : ''
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('name')
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    // Get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [category, page, searchQuery, sortBy, userLocation]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams({
        page: page.toString(),
        category: category
      });
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (userLocation && sortBy === 'distance') {
        params.append('lat', userLocation.lat.toString());
        params.append('lon', userLocation.lon.toString());
      }

      const response = await fetch(`/api/businesses?${params.toString()}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch businesses');
      }

      setBusinesses(data.data.businesses);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching businesses');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchBusinesses();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8 mb-8"
      >
        <Link 
          href="/categories"
          className="text-white hover:text-primary-100 mb-4 inline-block"
        >
          ← Back to Categories
        </Link>
        <h1 className="text-4xl font-bold">{formatCategoryName(category)}</h1>
        <p className="text-xl mt-2">
          Browse {formatCategoryName(category)} businesses in New York State
        </p>
      </motion.div>

      {/* Search and Sort Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={`Search ${formatCategoryName(category)} businesses...`}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'name')}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            {userLocation && <option value="distance">Sort by Distance</option>}
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </form>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchBusinesses}
              className="text-red-700 hover:text-red-900 font-medium"
            >
              Retry
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="large" />
        </div>
      ) : businesses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 text-lg">No businesses found matching your search.</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {businesses.map((business) => (
              <motion.div
                key={business._id}
                variants={item}
              >
                <BusinessCard business={business} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center gap-2 mt-8"
            >
              <button
                onClick={() => setPage(page - 1)}
                disabled={!pagination.hasPrevPage}
                className={`px-4 py-2 rounded-lg ${
                  !pagination.hasPrevPage
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              <div className="flex gap-1">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrentPage = pageNum === page;
                  const isNearCurrentPage = 
                    Math.abs(pageNum - page) <= 1 || 
                    pageNum === 1 || 
                    pageNum === pagination.totalPages;

                  if (!isNearCurrentPage) {
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        isCurrentPage
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-4 py-2 rounded-lg ${
                  !pagination.hasNextPage
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Next
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
} 