"use client";

import { useState } from 'react';
import { businessCategories, featuredListings, recentListings, boroughs } from '@/lib/data';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBorough, setSelectedBorough] = useState('');
  
  // Filter listings based on search term, category, and borough
  const filteredListings = recentListings.filter(listing => {
    const matchesSearch = searchTerm === '' || 
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || listing.category === selectedCategory;
    const matchesBorough = selectedBorough === '' || listing.borough === selectedBorough;
    
    return matchesSearch && matchesCategory && matchesBorough;
  });
  
  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedBorough,
    setSelectedBorough,
    filteredListings,
    categories: businessCategories,
    boroughs
  };
}

export function useViewToggle() {
  const [viewMode, setViewMode] = useState('list');
  
  const toggleView = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };
  
  return { viewMode, toggleView };
}

export function useListingDetails(id: string) {
  // Find the listing with the matching ID
  const listing = recentListings.find(item => item.id === id);
  
  // Find the category for this listing
  const category = listing ? businessCategories.find(cat => cat.id === listing.category) : null;
  
  // Get related listings (same category, excluding current listing)
  const relatedListings = listing 
    ? recentListings.filter(item => item.category === listing.category && item.id !== id).slice(0, 3)
    : [];
  
  return { listing, category, relatedListings };
}

export function useBusinessSubmission() {
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    address: '',
    borough: '',
    phone: '',
    email: '',
    website: '',
    businessHours: '',
    specialOffers: '',
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Business description is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.borough) {
      newErrors.borough = 'Please select a borough';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    selectedPlan,
    setSelectedPlan,
    isSubmitting,
    isSubmitted
  };
}
