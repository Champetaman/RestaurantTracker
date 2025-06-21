import React from 'react';
import { Star, MapPin, Calendar, DollarSign, Share2, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Restaurant } from '../types/restaurant';
import { useRestaurants } from '../contexts/RestaurantContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const { dispatch } = useRestaurants();

  const handleCardClick = () => {
    dispatch({ type: 'SET_SELECTED_RESTAURANT', payload: restaurant });
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: `${restaurant.name} - Restaurant Review`,
      text: `Check out ${restaurant.name} in ${restaurant.city}! ${restaurant.description}`,
      url: `${window.location.origin}?restaurant=${restaurant.id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        showNotification('Restaurant details copied to clipboard!', 'success');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showNotification('Failed to share restaurant details', 'error');
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_RESTAURANT', payload: restaurant });
    dispatch({ type: 'SET_EDIT_MODE', payload: true });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${restaurant.name}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      dispatch({ type: 'DELETE_RESTAURANT', payload: restaurant.id });
      showNotification(`"${restaurant.name}" has been deleted.`, 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg';
          }}
        />
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
            title="Share restaurant"
          >
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>
          <motion.button
            onClick={handleEdit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
            title="Edit restaurant"
          >
            <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </motion.button>
          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
            title="Delete restaurant"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            {restaurant.cuisine}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{restaurant.priceRange}</span>
          </div>
        </div>

        <div className="flex items-center mb-3">
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

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {restaurant.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{restaurant.city}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{format(new Date(restaurant.dateVisited), 'MMM dd, yyyy')}</span>
          </div>
        </div>

        {/* Characteristics */}
        <div className="flex flex-wrap gap-1">
          {restaurant.characteristics.slice(0, 3).map(characteristic => (
            <span
              key={characteristic}
              className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
            >
              {characteristic}
            </span>
          ))}
          {restaurant.characteristics.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
              +{restaurant.characteristics.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}