"use client";

import React from 'react';
import Link from 'next/link';

interface AdBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function AdBanner({ title, description, buttonText, buttonLink }: AdBannerProps) {
  return (
    <section className="bg-blue-50 border-y border-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-blue-800">{title}</h3>
            <p className="text-blue-600">{description}</p>
          </div>
          <Link 
            href={buttonLink}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
