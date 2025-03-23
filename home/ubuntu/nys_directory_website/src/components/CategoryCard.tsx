"use client";

import React from 'react';
import Link from 'next/link';

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
    count: number;
    sponsored?: boolean;
    sponsorName?: string;
  };
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/${category.id}`} className="block">
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
        {category.sponsored && (
          <div className="flex justify-end mb-2">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Sponsored by {category.sponsorName}
            </span>
          </div>
        )}
        
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
            <span className="text-2xl">{getIconForCategory(category.id)}</span>
          </div>
          <h3 className="text-xl font-semibold">{category.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{category.description}</p>
        
        <div className="text-blue-600 font-medium">
          {category.count} listings
        </div>
      </div>
    </Link>
  );
};

// Helper function to get icon based on category
function getIconForCategory(categoryId: string): string {
  const iconMap: Record<string, string> = {
    government: '🏛️',
    healthcare: '🏥',
    education: '🎓',
    legal: '⚖️',
    lifestyle: '🍽️',
    safety: '🛡️',
    events: '🎭'
  };
  
  return iconMap[categoryId] || '📋';
}

export default CategoryCard;
