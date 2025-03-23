"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { categories, locations, getFeaturedBusinesses, searchBusinesses } from '@/lib/data';
import AdBanner from '@/components/AdBanner';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const featuredBusinesses = getFeaturedBusinesses().slice(0, 6);
  
  const handleSearch = (query, category, location) => {
    const results = searchBusinesses(query, category, location);
    setSearchResults(results);
    setHasSearched(true);
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Banner Ad */}
      <AdBanner type="banner" className="w-full" />
      
      {/* Hero Section with Search */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">New York State Directory</h1>
          <p className="text-xl mb-8">Find businesses, services, and government offices across New York State</p>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      {/* Search Results (if any) */}
      {hasSearched && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 6).map(business => (
                  <ListingCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <p>No results found. Please try a different search term.</p>
            )}
            {searchResults.length > 6 && (
              <div className="mt-6 text-center">
                <Link href={`/search?q=${searchQuery}`} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  View All {searchResults.length} Results
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Listings Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Businesses</h2>
            <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Sponsored</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map(business => (
              <ListingCard key={business.id} business={business} featured={true} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Locations Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Browse by Borough</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {locations.map(location => (
              <Link 
                key={location.id} 
                href={`/location/${location.id}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold">{location.name}</h3>
                <p className="text-gray-500 mt-2">{location.zipCodes.length} ZIP Codes</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom Banner Ad */}
      <AdBanner type="banner" className="w-full" />
    </main>
  );
}
