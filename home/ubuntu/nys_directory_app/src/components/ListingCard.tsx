"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ListingCardProps {
  listing: {
    id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    borough: string;
    phone: string;
    website: string;
    image: string;
    rating: number;
    reviews: number;
    featured: boolean;
  };
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <Image 
          src={listing.image}
          alt={listing.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        {listing.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="ml-1 text-gray-700 text-sm">{listing.rating}</span>
          </div>
          <span className="text-gray-500 text-xs">({listing.reviews} reviews)</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{listing.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
        <div className="flex items-start mb-3">
          <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="text-sm text-gray-700">{listing.address}</span>
        </div>
        <Link 
          href={`/${listing.category}/${listing.id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
