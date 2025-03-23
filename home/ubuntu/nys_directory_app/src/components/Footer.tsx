import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="ad-banner h-24">BANNER ADVERTISEMENT</div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center text-sm text-gray-600 space-x-4">
          <a href="/about" className="hover:text-blue-600">About</a>
          <span>|</span>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <span>|</span>
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
          <span>|</span>
          <a href="/advertise" className="hover:text-blue-600">Advertise</a>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          © 2025 New York State Directory
        </div>
      </div>
    </footer>
  );
}
