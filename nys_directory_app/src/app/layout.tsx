import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'New York State Business Directory',
    template: '%s | NYS Business Directory'
  },
  description: 'Find and connect with businesses across New York State. Browse by category, location, or search for specific services.',
  keywords: ['New York', 'business directory', 'NY businesses', 'local businesses', 'NY services'],
  authors: [{ name: 'NYS Business Directory' }],
  creator: 'NYS Business Directory',
  publisher: 'NYS Business Directory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nys-business-directory.com',
    siteName: 'New York State Business Directory',
    title: 'New York State Business Directory',
    description: 'Find and connect with businesses across New York State. Browse by category, location, or search for specific services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'New York State Business Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New York State Business Directory',
    description: 'Find and connect with businesses across New York State. Browse by category, location, or search for specific services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                NYS Directory
              </Link>
              <div className="flex items-center space-x-6">
                <Link 
                  href="/categories" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Categories
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="/submit" 
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  List Your Business
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        <footer className="bg-gray-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About NYS Directory</h3>
                <p className="text-gray-600">
                  Your trusted source for finding businesses across New York State.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/categories" className="text-gray-600 hover:text-primary-600">
                      Browse Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-primary-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} NYS Business Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
