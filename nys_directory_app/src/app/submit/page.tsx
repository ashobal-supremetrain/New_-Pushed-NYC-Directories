'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          category: '',
          address: '',
          phone: '',
          email: '',
          website: '',
          description: ''
        });
      } else {
        setError(data.message || 'Failed to submit business');
      }
    } catch (err) {
      setError('Error submitting business');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link 
        href="/"
        className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Submit Your Business</h1>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-8">
          Your business has been successfully submitted! We'll review it shortly.
          <button
            onClick={() => setSuccess(false)}
            className="ml-4 text-sm underline"
          >
            Submit another business
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="restaurants">Restaurants</option>
              <option value="retail">Retail</option>
              <option value="healthcare">Healthcare</option>
              <option value="professional-services">Professional Services</option>
              <option value="entertainment">Entertainment</option>
              <option value="home-services">Home Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Street address, City, NY ZIP"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="(555) 555-5555"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Business Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Tell us about your business..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Business'}
          </button>
        </form>
      )}
    </div>
  )
} 