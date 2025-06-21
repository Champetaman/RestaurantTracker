import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Calendar, DollarSign, Share2, Edit, Trash2, ChevronLeft, ChevronRight, Save, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useRestaurants } from '../contexts/RestaurantContext';
import { Restaurant } from '../types/restaurant';
import { availableCharacteristics, availableCuisines } from '../data/mockRestaurants';

export function RestaurantDetail() {
  const { state, dispatch } = useRestaurants();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editData, setEditData] = useState<Restaurant | null>(null);

  const restaurant = state.selectedRestaurant;

  // Initialize edit data when entering edit mode
  useEffect(() => {
    if (state.isEditMode && restaurant && !editData) {
      setEditData({ ...restaurant });
    } else if (!state.isEditMode) {
      setEditData(null);
    }
  }, [state.isEditMode, restaurant, editData]);

  // Reset image index when restaurant changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [restaurant?.id]);

  if (!restaurant) return null;

  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_RESTAURANT', payload: null });
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
    setEditData(null);
  };

  const handleShare = async () => {
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

  const handleEdit = () => {
    dispatch({ type: 'SET_EDIT_MODE', payload: true });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${restaurant.name}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      dispatch({ type: 'DELETE_RESTAURANT', payload: restaurant.id });
      handleClose();
      showNotification(`"${restaurant.name}" has been deleted.`, 'error');
    }
  };

  const handleSave = () => {
    if (!editData) return;

    try {
      const updatedRestaurant: Restaurant = {
        ...editData,
        updatedAt: new Date().toISOString()
      };
      
      dispatch({ type: 'UPDATE_RESTAURANT', payload: updatedRestaurant });
      dispatch({ type: 'SET_EDIT_MODE', payload: false });
      setEditData(null);
      
      showNotification('Restaurant updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating restaurant:', error);
      showNotification('Failed to update restaurant', 'error');
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
    setEditData(null);
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

  const nextImage = () => {
    if (restaurant.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === restaurant.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (restaurant.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? restaurant.images.length - 1 : prev - 1
      );
    }
  };

  const displayData = state.isEditMode && editData ? editData : restaurant;

  const handleEditChange = (field: keyof Restaurant, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleRatingClick = (rating: number) => {
    if (state.isEditMode && editData) {
      setEditData({ ...editData, rating });
    }
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    if (state.isEditMode && editData) {
      const current = editData.characteristics;
      const updated = current.includes(characteristic)
        ? current.filter(c => c !== characteristic)
        : [...current, characteristic];
      setEditData({ ...editData, characteristics: updated });
    }
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
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex h-full max-h-[90vh]">
            {/* Left Panel - Details */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                <div className="flex-1 mr-4">
                  {state.isEditMode ? (
                    <input
                      type="text"
                      value={editData?.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none w-full"
                      placeholder="Restaurant name"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {restaurant.name}
                    </h1>
                  )}
                  <div className="flex items-center space-x-4 mt-2">
                    {state.isEditMode ? (
                      <>
                        <select
                          value={editData?.cuisine || ''}
                          onChange={(e) => handleEditChange('cuisine', e.target.value)}
                          className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select cuisine</option>
                          {availableCuisines.map(cuisine => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                          ))}
                        </select>
                        <span className="text-gray-400">•</span>
                        <input
                          type="text"
                          value={editData?.city || ''}
                          onChange={(e) => handleEditChange('city', e.target.value)}
                          className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none"
                          placeholder="City"
                          list="cities"
                        />
                        <datalist id="cities">
                          {cities.map(city => (
                            <option key={city} value={city} />
                          ))}
                        </datalist>
                      </>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        {displayData.cuisine} • {displayData.city}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {state.isEditMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors rounded-full hover:bg-green-50 dark:hover:bg-green-900/20"
                        title="Save changes"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                        title="Cancel editing"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleShare}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                        title="Share restaurant"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleEdit}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Edit restaurant"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete restaurant"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Carousel */}
              <div className="flex-shrink-0 relative h-64 bg-gray-200 dark:bg-gray-800">
                {restaurant.images && restaurant.images.length > 0 && (
                  <img
                    src={restaurant.images[currentImageIndex]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg';
                    }}
                  />
                )}
                {restaurant.images && restaurant.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {restaurant.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Rating and Basic Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= displayData.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          } ${state.isEditMode ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                          onClick={state.isEditMode ? () => handleRatingClick(star) : undefined}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {displayData.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    {state.isEditMode ? (
                      <select
                        value={editData?.priceRange || ''}
                        onChange={(e) => handleEditChange('priceRange', e.target.value)}
                        className="ml-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none"
                      >
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                      </select>
                    ) : (
                      <span className="ml-1">{displayData.priceRange}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  {state.isEditMode ? (
                    <textarea
                      value={editData?.description || ''}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Restaurant description"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {restaurant.description}
                    </p>
                  )}
                </div>

                {/* Personal Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Our Notes
                  </h3>
                  {state.isEditMode ? (
                    <textarea
                      value={editData?.notes || ''}
                      onChange={(e) => handleEditChange('notes', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Personal notes about this restaurant"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {restaurant.notes || 'No notes added yet.'}
                    </p>
                  )}
                </div>

                {/* Visit Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Date Visited
                    </h4>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {state.isEditMode ? (
                        <input
                          type="date"
                          value={editData?.dateVisited || ''}
                          onChange={(e) => handleEditChange('dateVisited', e.target.value)}
                          className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <span>{format(new Date(restaurant.dateVisited), 'MMMM dd, yyyy')}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Location
                    </h4>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{displayData.city}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Address
                  </h4>
                  {state.isEditMode ? (
                    <input
                      type="text"
                      value={editData?.address || ''}
                      onChange={(e) => handleEditChange('address', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Restaurant address"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">{restaurant.address}</p>
                  )}
                </div>

                {/* Characteristics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Characteristics
                  </h4>
                  {state.isEditMode ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableCharacteristics.map((characteristic: string) => (
                        <label key={characteristic} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editData?.characteristics.includes(characteristic) || false}
                            onChange={() => handleCharacteristicToggle(characteristic)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {characteristic}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {displayData.characteristics.map((characteristic: string) => (
                        <span
                          key={characteristic}
                          className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {characteristic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                {displayData.tags && displayData.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {displayData.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Map */}
            <div className="w-96 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Interactive Map</p>
                  <p className="text-sm mb-4">
                    Google Maps integration will be<br />
                    implemented here
                  </p>
                  <div className="mt-4 text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Coordinates:</strong></p>
                    <p>{restaurant.coordinates.lat.toFixed(4)}, {restaurant.coordinates.lng.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}