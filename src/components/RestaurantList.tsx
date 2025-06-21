import React from 'react';
import { Star, MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useRestaurants } from '../contexts/RestaurantContext';

export function RestaurantList() {
  const { state, dispatch } = useRestaurants();

  const handleRestaurantClick = (restaurant: any) => {
    dispatch({ type: 'SET_SELECTED_RESTAURANT', payload: restaurant });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Restaurant List
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {state.filteredRestaurants.length} restaurant{state.filteredRestaurants.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {state.filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No restaurants found.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {state.filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleRestaurantClick(restaurant)}
              className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="ml-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {restaurant.cuisine} • {restaurant.city}
                    </p>
                  </div>
                  <div className="flex items-center ml-4">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {restaurant.priceRange}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= restaurant.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {restaurant.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-1">
                  {restaurant.description}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{format(new Date(restaurant.dateVisited), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.characteristics.slice(0, 2).map(characteristic => (
                      <span
                        key={characteristic}
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {characteristic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}