import React from 'react';
import { MapPin } from 'lucide-react';
import { useRestaurants } from '../contexts/RestaurantContext';

export function RestaurantMap() {
  const { state } = useRestaurants();

  return (
    <div className="h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <MapPin className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Interactive Map View</h3>
        <p className="text-sm mb-4">
          Google Maps integration will display all {state.filteredRestaurants.length} restaurants
        </p>
        <div className="text-xs space-y-1">
          <p>• Pin clustering for dense areas</p>
          <p>• Location detection</p>
          <p>• Smooth animations</p>
          <p>• Touch-friendly controls</p>
        </div>
      </div>
    </div>
  );
}