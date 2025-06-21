import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { RestaurantCard } from './RestaurantCard';
import { FilterSidebar } from './FilterSidebar';
import { useRestaurants } from '../contexts/RestaurantContext';

export function RestaurantGallery() {
  const { state } = useRestaurants();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Restaurant Adventures
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {state.filteredRestaurants.length} restaurant{state.filteredRestaurants.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {state.filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block ml-8">
        <FilterSidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
}