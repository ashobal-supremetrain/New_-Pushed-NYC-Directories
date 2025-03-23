"use client";

import React from 'react';
import Link from 'next/link';

interface AdSidebarProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function AdSidebar({ title, description, buttonText, buttonLink }: AdSidebarProps) {
  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-100">
      <h3 className="text-lg font-bold text-blue-800 mb-2">{title}</h3>
      <p className="text-sm text-blue-600 mb-4">{description}</p>
      <Link 
        href={buttonLink}
        className="block w-full py-2 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
