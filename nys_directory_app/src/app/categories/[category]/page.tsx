'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

export default function CategoryPage() {
  const params = useParams()
  const category = typeof params.category === 'string' ? params.category : ''
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBusinesses();
  }, [category, page]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/businesses?category=${encodeURIComponent(category)}&page=${page}`);
      const data = await response.json();
      
      if (data.success) {
        setBusinesses(data.data);
        setTotalPages(data.pagination.pages);
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

  const formatCategoryName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-8">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold">{formatCategoryName(category)}</h1>
        <p className="text-gray-600 mt-2">
          Browse {formatCategoryName(category)} businesses in New York State
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {business.description || `Located in ${business.address}`}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    {business.rating && (
                      <span className="mr-4">⭐️ {business.rating.toFixed(1)}/5</span>
                    )}
                    <span>📍 {business.address}</span>
                  </div>
                  {business.phone && (
                    <div className="mt-2 text-sm text-gray-500">
                      📞 {business.phone}
                    </div>
                  )}
                  {business.website && (
                    <a 
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-blue-600 hover:text-blue-800 text-sm inline-block"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
} 