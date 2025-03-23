"use client";

import { useSearch, useViewToggle } from '@/hooks';
import { ListingCard } from '@/components/ListingCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { AdBanner } from '@/components/AdBanner';
import { AdSidebar } from '@/components/AdSidebar';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryPage({ params }: { params: { category: string } }) {
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
  
  // Set the selected category based on the URL parameter
  const categoryId = params.category;
  const category = categories.find(cat => cat.id === categoryId);
  
  // Filter listings by the current category
  const categoryListings = filteredListings.filter(listing => listing.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Category Image */}
      <section className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={category.image}
            alt={category.name}
            fill
            style={{ objectFit: 'cover', opacity: 0.4 }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-xl text-white mb-6">{category.description}</p>
          <div className="max-w-3xl">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder={`Search in ${category.name}...`}
            />
          </div>
        </div>
      </section>
      
      {/* Ad Banner */}
      <AdBanner 
        title={`Advertise Your ${category.name} Business`}
        description="Get featured in our directory and reach thousands of potential customers"
        buttonText="List Your Business"
        buttonLink="/list-business"
      />
      
      {/* Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {categoryListings.length} {category.name} Listings
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleView}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {viewMode === 'list' ? 'Map View' : 'List View'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <FilterSidebar 
                categories={categories}
                selectedCategory={categoryId}
                setSelectedCategory={setSelectedCategory}
                boroughs={boroughs}
                selectedBorough={selectedBorough}
                setSelectedBorough={setSelectedBorough}
              />
              
              <div className="mt-8">
                <AdSidebar 
                  title={`Premium ${category.name} Listings`}
                  description="Stand out from the competition with our premium listing options"
                  buttonText="Learn More"
                  buttonLink="/list-business"
                />
              </div>
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sponsored Category</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-700 mb-2">This category is sponsored by:</p>
                  <div className="bg-white p-3 rounded-md flex items-center justify-center h-20">
                    <p className="text-gray-500 text-sm">Sponsor Logo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              {viewMode === 'list' ? (
                categoryListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryListings.map(listing => (
                      <ListingCard 
                        key={listing.id}
                        listing={listing}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No listings found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedBorough('');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                )
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-md h-96 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image 
                      src={category.image}
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
          </div>
        </div>
      </section>
      
      {/* Featured in Category */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured {category.name} Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryListings.filter(listing => listing.featured).slice(0, 3).map(listing => (
              <ListingCard 
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">List Your {category.name} Business Today</h2>
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
