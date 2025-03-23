"use client";

import { useState, useEffect } from 'react';
import { useSearch, useViewToggle } from '@/hooks';
import { CategoryCard } from '@/components/CategoryCard';
import { ListingCard } from '@/components/ListingCard';
import { SearchBar } from '@/components/SearchBar';
import { AdBanner } from '@/components/AdBanner';
import { AdSidebar } from '@/components/AdSidebar';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    selectedBorough,
    setSelectedBorough,
    filteredListings,
    categories,
    boroughs
  } = useSearch();
  
  const { viewMode, toggleView } = useViewToggle();
  
  // Featured categories to display on homepage
  const featuredCategories = categories.slice(0, 6);
  
  // Featured listings to display on homepage
  const featuredListings = filteredListings.filter(listing => listing.featured).slice(0, 3);
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/images/nyc_skyline_sunset.jpeg"
            alt="New York City Skyline"
            fill
            style={{ objectFit: 'cover', opacity: 0.4 }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">New York State Directory</h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Find businesses, services, and government offices across New York State
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder="Search for businesses, services, or keywords..."
            />
          </div>
        </div>
      </section>
      
      {/* Ad Banner */}
      <AdBanner 
        title="Advertise Your Business Here"
        description="Reach thousands of potential customers with our premium ad spots"
        buttonText="Learn More"
        buttonLink="/list-business"
      />
      
      {/* Popular Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredCategories.map(category => (
              <CategoryCard 
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Listings</h2>
            <Link 
              href="/list-business"
              className="text-blue-600 hover:underline font-medium"
            >
              List Your Business →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredListings.map(listing => (
              <ListingCard 
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Businesses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Trending Businesses</h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleView}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {viewMode === 'list' ? 'Map View' : 'List View'}
                  </button>
                </div>
              </div>
              
              {viewMode === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredListings.slice(0, 6).map(listing => (
                    <ListingCard 
                      key={listing.id}
                      listing={listing}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-md h-96 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image 
                      src="/images/empire_state_sunset.jpeg"
                      alt="Map View"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <p className="text-white text-xl font-medium">Interactive Map View Coming Soon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Filter By</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="category-all" className="ml-2 text-gray-700">
                      All Categories
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Boroughs</h3>
                <div className="space-y-2">
                  {boroughs.map(borough => (
                    <div key={borough.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`borough-${borough.id}`}
                        name="borough"
                        checked={selectedBorough === borough.id}
                        onChange={() => setSelectedBorough(borough.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`borough-${borough.id}`} className="ml-2 text-gray-700">
                        {borough.name}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="borough-all"
                      name="borough"
                      checked={selectedBorough === ''}
                      onChange={() => setSelectedBorough('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="borough-all" className="ml-2 text-gray-700">
                      All Boroughs
                    </label>
                  </div>
                </div>
              </div>
              
              <AdSidebar 
                title="Advertise Here"
                description="Reach your target audience with our premium ad spots"
                buttonText="Learn More"
                buttonLink="/list-business"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">List Your Business Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses in our directory and reach new customers across New York State
          </p>
          <Link 
            href="/list-business"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
