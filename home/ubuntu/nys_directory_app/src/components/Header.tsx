import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            NEW YORK STATE DIRECTORY
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            LOGIN
          </Link>
          <Link href="/register" className="btn-primary">
            REGISTER
          </Link>
        </div>
      </div>
    </header>
  );
}
