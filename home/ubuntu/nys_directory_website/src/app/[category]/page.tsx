'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categories, locations, getBusinessesByCategory, getAdsByCategory, getAdsByType } from '@/lib/data';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  
  const category = categories.find(c => c.id === categoryId);
  const businesses = getBusinessesByCategory(categoryId);
  const bannerAds = getAdsByType('banner').filter(ad => !ad.targetCategories || ad.targetCategories.includes(categoryId));
  const sidebarAds = getAdsByType('sidebar').filter(ad => !ad.targetCategories || ad.targetCategories.includes(categoryId));
  
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter businesses based on search query and location
  const filteredBusinesses = businesses.filter(business => {
    const matchesQuery = searchQuery === '' || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = filterLocation === '' || business.borough === filterLocation;
    
    return matchesQuery && matchesLocation;
  });
  
  // Sort businesses to show featured ones first
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner Ad - Top */}
      {bannerAds.length > 0 && (
        <div className="w-full bg-blue-100 p-3 text-center border border-blue-200">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500">Advertisement</p>
            <div className="h-16 md:h-24 bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400">Banner Advertisement for {category?.name}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Category Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category?.name}</h1>
              <p className="text-lg md:text-xl">{category?.description}</p>
            </div>
            
            {category?.sponsored && (
              <div className="mt-4 md:mt-0 bg-yellow-400 text-yellow-800 px-4 py-2 rounded-lg font-semibold">
                Sponsored by {category.sponsorName}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Results</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search in this category..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="rating-4" className="rounded text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="rating-4" className="text-gray-700">4+ Stars</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="rating-3" className="rounded text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="rating-3" className="text-gray-700">3+ Stars</label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Features</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="verified" className="rounded text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="verified" className="text-gray-700">Verified Only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="open-now" className="rounded text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="open-now" className="text-gray-700">Open Now</label>
                </div>
              </div>
            </div>
            
            {/* Sidebar Ads */}
            {sidebarAds.length > 0 && (
              <div className="bg-blue-50 rounded-lg shadow-md p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Advertisement</p>
                <div className="bg-white border border-gray-200 rounded p-4 h-64 flex items-center justify-center">
                  <span className="text-gray-400">Sidebar Ad for {category?.name}</span>
                </div>
              </div>
            )}
            
            {/* Related Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Categories</h2>
              <ul className="space-y-2">
                {categories.filter(c => c.id !== categoryId).slice(0, 5).map(relatedCategory => (
                  <li key={relatedCategory.id}>
                    <Link 
                      href={`/${relatedCategory.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {relatedCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* View Toggle and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-700 mb-4 sm:mb-0">
                <span className="font-semibold">{filteredBusinesses.length}</span> results found
              </p>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md ${viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  List View
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md ${viewMode === 'map' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Map View
                </button>
              </div>
            </div>
            
            {/* Map View */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Interactive Map View</p>
                    <p className="text-gray-400 text-sm">Showing {filteredBusinesses.length} businesses in {category?.name}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-6">
                {sortedBusinesses.map(business => (
                  <Link 
                    href={`/${categoryId}/${business.id}`} 
                    key={business.id}
                    className="group"
                  >
                    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition duration-200 hover:shadow-lg ${business.featured ? 'border-l-4 border-yellow-400' : ''}`}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                            {business.name} Image
                          </div>
                          
                          {business.featured && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-xs font-semibold text-yellow-800 px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                          
                          {business.verified && (
                            <div className="absolute top-4 right-4 bg-blue-500 text-xs font-semibold text-white px-2 py-1 rounded-full">
                              Verified
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 md:w-2/3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">{business.name}</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-gray-700">{business.rating}</span>
                              <span className="text-gray-500 ml-1">({business.reviewCount})</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{business.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-gray-500">
                              <span className="mr-1">📍</span>
                              <span>{business.address}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-500">
                              <span className="mr-1">📞</span>
                              <span>{business.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {business.services.slice(0, 3).map((service, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                            {business.services.length > 3 && (
                              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                                +{business.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {filteredBusinesses.length === 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-700 mb-2">No businesses found matching your criteria.</p>
                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Banner Ad - Bottom */}
      {bannerAds.length > 0 && (
        <div className="w-full bg-blue-100 p-3 text-center border border-blue-200">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500">Advertisement</p>
            <div className="h-16 md:h-24 bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400">Banner Advertisement for {category?.name}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Own a {category?.name} Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Get listed in our directory and reach thousands of potential customers every day.</p>
          <Link 
            href="/list-business" 
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-md text-lg hover:bg-gray-100 transition duration-200"
          >
            List Your Business
          </Link>
        </div>
      </section>
    </main>
  );
}
