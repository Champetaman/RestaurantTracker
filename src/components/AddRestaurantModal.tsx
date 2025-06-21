import React, { useState } from 'react';
import { X, Star, DollarSign, Save, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRestaurants } from '../contexts/RestaurantContext';
import { Restaurant } from '../types/restaurant';
import { availableCharacteristics, availableCuisines } from '../data/mockRestaurants';

export function AddRestaurantModal() {
  const { state, dispatch } = useRestaurants();
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    address: '',
    city: '',
    rating: 0,
    description: '',
    notes: '',
    dateVisited: new Date().toISOString().split('T')[0],
    characteristics: [] as string[],
    priceRange: '$' as '$' | '$$' | '$$$' | '$$$$',
    tags: [] as string[],
    images: ['https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg'],
    coordinates: { lat: 4.6097, lng: -74.0817 }
  });

  if (!state.isAddMode) return null;

  const handleClose = () => {
    dispatch({ type: 'SET_ADD_MODE', payload: false });
    setFormData({
      name: '',
      cuisine: '',
      address: '',
      city: '',
      rating: 0,
      description: '',
      notes: '',
      dateVisited: new Date().toISOString().split('T')[0],
      characteristics: [],
      priceRange: '$',
      tags: [],
      images: ['https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg'],
      coordinates: { lat: 4.6097, lng: -74.0817 }
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.cuisine || !formData.city.trim()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      const newRestaurant: Restaurant = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        cuisine: formData.cuisine,
        address: formData.address.trim(),
        city: formData.city.trim(),
        coordinates: formData.coordinates,
        rating: formData.rating,
        description: formData.description.trim(),
        images: formData.images,
        dateVisited: formData.dateVisited,
        characteristics: formData.characteristics,
        priceRange: formData.priceRange,
        tags: formData.tags,
        notes: formData.notes.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      dispatch({ type: 'ADD_RESTAURANT', payload: newRestaurant });
      handleClose();
      showNotification('Restaurant added successfully!', 'success');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      showNotification('Failed to add restaurant', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2000);
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    const current = formData.characteristics;
    const updated = current.includes(characteristic)
      ? current.filter(c => c !== characteristic)
      : [...current, characteristic];
    setFormData({ ...formData, characteristics: updated });
  };

  const cities = [...new Set(state.restaurants.map(r => r.city))];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Restaurant
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-700 transition-colors rounded-full hover:bg-green-50 dark:hover:bg-green-900/20"
                  title="Save restaurant"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter restaurant name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Cuisine *
                  </label>
                  <select
                    value={formData.cuisine}
                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select cuisine</option>
                    {availableCuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                    list="cities"
                  />
                  <datalist id="cities">
                    {cities.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              {/* Rating and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer hover:scale-110 transition-transform ${
                          star <= formData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        onClick={() => handleRatingClick(star)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {formData.rating > 0 ? formData.rating.toFixed(1) : 'Not rated'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Price Range
                  </label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as '$' | '$$' | '$$$' | '$$$$' })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="$">$ - Budget</option>
                    <option value="$$">$$ - Moderate</option>
                    <option value="$$$">$$$ - Expensive</option>
                    <option value="$$$$">$$$$ - Very Expensive</option>
                  </select>
                </div>
              </div>

              {/* Date Visited */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Date Visited
                </label>
                <input
                  type="date"
                  value={formData.dateVisited}
                  onChange={(e) => setFormData({ ...formData, dateVisited: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your experience at this restaurant"
                />
              </div>

              {/* Personal Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Personal Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add your personal notes about this restaurant"
                />
              </div>

              {/* Characteristics */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Characteristics
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableCharacteristics.map((characteristic: string) => (
                    <label key={characteristic} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.characteristics.includes(characteristic)}
                        onChange={() => handleCharacteristicToggle(characteristic)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {characteristic}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}