"use client";

import { useBusinessSubmission } from '@/hooks';
import { AdBanner } from '@/components/AdBanner';
import Link from 'next/link';
import Image from 'next/image';

export default function ListBusinessPage() {
  const { 
    formData, 
    setFormData, 
    errors, 
    handleSubmit, 
    selectedPlan,
    setSelectedPlan,
    isSubmitting,
    isSubmitted
  } = useBusinessSubmission();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      features: [
        'Standard listing in directory',
        'Basic business information',
        'Contact details',
        'Address and map location'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29.99/mo',
      features: [
        'Everything in Basic',
        'Featured in category searches',
        'Business logo and photos',
        'Extended business description',
        'Business hours',
        'Social media links'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$99.99/mo',
      features: [
        'Everything in Premium',
        'Top placement in search results',
        'Featured on homepage',
        'Highlighted as "Elite Business"',
        'Dedicated sidebar ad space',
        'Monthly performance reports'
      ]
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You for Your Submission!</h1>
              <p className="text-gray-600 mb-6">Your business listing has been submitted successfully.</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">What Happens Next?</h2>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Our team will review your submission within 1-2 business days</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>You'll receive a confirmation email with your listing details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Once approved, your listing will be live on our directory</span>
                  </li>
                  {selectedPlan !== 'basic' && (
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>A representative will contact you to set up your {selectedPlan === 'premium' ? 'Premium' : 'Elite'} features</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/images/nyc_skyline_sunset.jpeg"
            alt="New York City Skyline"
            fill
            style={{ objectFit: 'cover', opacity: 0.4 }}
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">List Your Business</h1>
          <p className="text-xl text-white mb-6 max-w-3xl mx-auto">
            Join thousands of businesses in our directory and reach new customers across New York State
          </p>
        </div>
      </section>
      
      {/* Ad Banner */}
      <AdBanner 
        title="Get Featured in Our Directory"
        description="Stand out from the competition with our premium listing options"
        buttonText="Learn More"
        buttonLink="#pricing-plans"
      />
      
      {/* Pricing Plans */}
      <section id="pricing-plans" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Choose Your Listing Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:shadow-lg'
                }`}
              >
                <div className="p-6 bg-gray-50 border-b">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-blue-600">{plan.price}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-md font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Submission Form */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name*
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Category*
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="government">Government Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="legal">Legal & Financial</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="safety">Public Safety</option>
                    <option value="events">Events & Attractions</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description*
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="borough" className="block text-sm font-medium text-gray-700 mb-1">
                    Borough*
                  </label>
                  <select
                    id="borough"
                    value={formData.borough}
                    onChange={(e) => setFormData({...formData, borough: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.borough ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a borough</option>
                    <option value="manhattan">Manhattan</option>
                    <option value="brooklyn">Brooklyn</option>
                    <option value="queens">Queens</option>
                    <option value="bronx">The Bronx</option>
                    <option value="staten_island">Staten Island</option>
                  </select>
                  {errors.borough && (
                    <p className="mt-1 text-sm text-red-600">{errors.borough}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.tar<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>