"use client";

import { useListingDetails } from '@/hooks';
import { AdBanner } from '@/components/AdBanner';
import { AdSidebar } from '@/components/AdSidebar';
import { ListingCard } from '@/components/ListingCard';
import Link from 'next/link';
import Image from 'next/image';

export default function ListingDetailsPage({ params }: { params: { id: string } }) {
  const { listing, relatedListings, category } = useListingDetails(params.id);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
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
      {/* Hero Section with Listing Image */}
      <section className="relative h-80 bg-gray-800 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={listing.image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover', opacity: 0.7 }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-3xl">
            <div className="flex items-center mb-2">
              {listing.featured && (
                <span className="bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                  Featured
                </span>
              )}
              <Link href={`/${listing.category}`} className="text-blue-600 text-sm hover:underline">
                {category?.name}
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{listing.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-1 text-gray-700">{listing.rating}</span>
                <span className="ml-1 text-gray-500">({listing.reviews} reviews)</span>
              </div>
            </div>
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
      
      {/* Listing Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-700 mb-6">{listing.description}</p>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Address</h3>
                      <p className="text-gray-700">{listing.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-700">{listing.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Website</h3>
                      <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {listing.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="bg-gray-100 rounded-lg h-64 mb-6 relative">
                  <Image 
                    src="/images/manhattan_contrasts.jpeg"
                    alt="Map location"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-xl font-medium">Interactive Map Coming Soon</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-1 text-gray-700">{listing.rating}</span>
                      <span className="ml-1 text-gray-500">({listing.reviews} reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">Reviews will be displayed here in the full implementation.</p>
                  <button className="text-blue-600 hover:underline">Write a Review</button>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tuesday</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Wednesday</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Thursday</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Friday</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="text-gray-700">10:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="text-gray-700">Closed</span>
                  </div>
                </div>
              </div>
              
              <AdSidebar 
                title="Advertise Your Business"
                description="Get featured in our directory and reach thousands of potential customers"
                buttonText="List Your Business"
                buttonLink="/list-business"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Listings */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Similar Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedListings.map(related => (
              <ListingCard 
                key={related.id}
                listing={related}
              />
            ))}
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
