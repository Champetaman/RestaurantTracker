import React from 'react';
import { X, Star, DollarSign } from 'lucide-react';
import { useRestaurants } from '../contexts/RestaurantContext';
import { availableCharacteristics, availableCuisines } from '../data/mockRestaurants';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const { state, dispatch } = useRestaurants();

  const handleCuisineChange = (cuisine: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { cuisine: cuisine === state.filters.cuisine ? '' : cuisine } });
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    const current = state.filters.characteristics;
    const updated = current.includes(characteristic)
      ? current.filter(c => c !== characteristic)
      : [...current, characteristic];
    dispatch({ type: 'SET_FILTERS', payload: { characteristics: updated } });
  };

  const handleRatingChange = (rating: number) => {
    dispatch({ type: 'SET_FILTERS', payload: { rating: rating === state.filters.rating ? 0 : rating } });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { priceRange: priceRange === state.filters.priceRange ? '' : priceRange } });
  };

  const clearAllFilters = () => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { 
        cuisine: '', 
        characteristics: [], 
        rating: 0, 
        priceRange: '' 
      } 
    });
  };

  const cities = [...new Set(state.restaurants.map(r => r.city))];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform lg:relative lg:w-64 lg:shadow-none overflow-y-auto z-40">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Clear all
              </button>
              <button onClick={onClose} className="lg:hidden">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Cuisine Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Cuisine</h3>
            <div className="space-y-2">
              {availableCuisines.map(cuisine => (
                <label key={cuisine} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.filters.cuisine === cuisine}
                    onChange={() => handleCuisineChange(cuisine)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">City</h3>
            <div className="space-y-2">
              {cities.map(city => (
                <label key={city} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.filters.city === city}
                    onChange={() => dispatch({ type: 'SET_FILTERS', payload: { city: city === state.filters.city ? '' : city } })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{city}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    state.filters.rating === rating
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">& up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
            <div className="space-y-2">
              {['$', '$$', '$$$', '$$$$'].map(price => (
                <button
                  key={price}
                  onClick={() => handlePriceRangeChange(price)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    state.filters.priceRange === price
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Characteristics Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Characteristics</h3>
            <div className="space-y-2">
              {availableCharacteristics.map(characteristic => (
                <label key={characteristic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={state.filters.characteristics.includes(characteristic)}
                    onChange={() => handleCharacteristicToggle(characteristic)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {characteristic}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}