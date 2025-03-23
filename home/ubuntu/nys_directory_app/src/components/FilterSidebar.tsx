"use client";

import React from 'react';
import Link from 'next/link';

interface FilterSidebarProps {
  categories: Array<{
    id: string;
    name: string;
  }>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  boroughs: Array<{
    id: string;
    name: string;
  }>;
  selectedBorough: string;
  setSelectedBorough: (borough: string) => void;
}

export function FilterSidebar({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  boroughs,
  selectedBorough,
  setSelectedBorough
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filter Results</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={`filter-category-${category.id}`}
                name="filter-category"
                checked={selectedCategory === category.id}
                onChange={() => setSelectedCategory(category.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`filter-category-${category.id}`} className="ml-2 text-sm text-gray-700">
                {category.name}
              </label>
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="radio"
              id="filter-category-all"
              name="filter-category"
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="filter-category-all" className="ml-2 text-sm text-gray-700">
              All Categories
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Boroughs</h4>
        <div className="space-y-2">
          {boroughs.map(borough => (
            <div key={borough.id} className="flex items-center">
              <input
                type="radio"
                id={`filter-borough-${borough.id}`}
                name="filter-borough"
                checked={selectedBorough === borough.id}
                onChange={() => setSelectedBorough(borough.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`filter-borough-${borough.id}`} className="ml-2 text-sm text-gray-700">
                {borough.name}
              </label>
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="radio"
              id="filter-borough-all"
              name="filter-borough"
              checked={selectedBorough === ''}
              onChange={() => setSelectedBorough('')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="filter-borough-all" className="ml-2 text-sm text-gray-700">
              All Boroughs
            </label>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            setSelectedCategory('');
            setSelectedBorough('');
          }}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
