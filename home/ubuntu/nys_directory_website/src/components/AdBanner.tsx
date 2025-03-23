"use client";

import React from 'react';
import Link from 'next/link';
import { getAdsByType } from '@/lib/data';

type AdBannerProps = {
  type: 'banner' | 'sidebar';
  className?: string;
  categoryId?: string;
};

const AdBanner: React.FC<AdBannerProps> = ({ type, className = '', categoryId }) => {
  // Get ads of the specified type, filtered by category if provided
  const ads = getAdsByType(type).filter(ad => 
    !categoryId || !ad.targetCategories || ad.targetCategories.includes(categoryId)
  );
  
  // If no ads are available, return a placeholder
  if (ads.length === 0) {
    return (
      <div className={`ad-container ${className} bg-gray-200 text-center p-4 rounded`}>
        <div className="text-xs text-gray-500 mb-1">Advertisement</div>
        <div className="bg-gray-300 h-16 md:h-24 flex items-center justify-center rounded">
          <span className="text-gray-500">Ad Space Available</span>
        </div>
      </div>
    );
  }
  
  // Select a random ad from the available ones
  const randomAd = ads[Math.floor(Math.random() * ads.length)];
  
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-500 mb-1 text-center">Advertisement</div>
      <Link href={randomAd.linkUrl} target="_blank" rel="noopener noreferrer">
        <div className={`ad ${type === 'banner' ? 'w-full h-24 md:h-32' : 'w-full h-64'} bg-gray-200 rounded flex items-center justify-center`}>
          {randomAd.imageUrl ? (
            <img 
              src={randomAd.imageUrl} 
              alt={randomAd.altText} 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center p-4">
              <p className="font-bold">{randomAd.altText}</p>
              <p className="text-sm text-blue-600 mt-2">Click to learn more</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AdBanner;
