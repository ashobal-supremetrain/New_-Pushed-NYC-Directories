import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYS Directory",
  description: "New York State Business Directory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">NYS Directory</Link>
              <div className="space-x-4">
                <Link href="/" className="hover:text-blue-200">Home</Link>
                <Link href="/categories" className="hover:text-blue-200">Categories</Link>
                <Link href="/businesses" className="hover:text-blue-200">Businesses</Link>
                <Link href="/submit" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">Submit Business</Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <p className="text-gray-600">Your comprehensive guide to businesses in New York State.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                  <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-600">Email: ashobal@sinfosecurity.com</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} NYS Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
