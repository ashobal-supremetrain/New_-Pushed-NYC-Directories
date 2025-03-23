"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/${category.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-40">
          <Image 
            src={category.image}
            alt={category.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{category.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
