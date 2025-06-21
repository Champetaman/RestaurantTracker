import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Restaurant, RestaurantFilters, ViewMode } from '../types/restaurant';
import { mockRestaurants } from '../data/mockRestaurants';

interface RestaurantState {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  filters: RestaurantFilters;
  viewMode: ViewMode;
  isDarkMode: boolean;
  isLoading: boolean;
  isEditMode: boolean;
  isAddMode: boolean;
}

type RestaurantAction = 
  | { type: 'SET_RESTAURANTS'; payload: Restaurant[] }
  | { type: 'ADD_RESTAURANT'; payload: Restaurant }
  | { type: 'UPDATE_RESTAURANT'; payload: Restaurant }
  | { type: 'DELETE_RESTAURANT'; payload: string }
  | { type: 'SET_SELECTED_RESTAURANT'; payload: Restaurant | null }
  | { type: 'SET_FILTERS'; payload: Partial<RestaurantFilters> }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_EDIT_MODE'; payload: boolean }
  | { type: 'SET_ADD_MODE'; payload: boolean }
  | { type: 'FILTER_RESTAURANTS' };

const initialFilters: RestaurantFilters = {
  search: '',
  cuisine: '',
  city: '',
  rating: 0,
  characteristics: [],
  priceRange: '',
  dateRange: { start: '', end: '' }
};

const initialState: RestaurantState = {
  restaurants: mockRestaurants,
  filteredRestaurants: mockRestaurants,
  selectedRestaurant: null,
  filters: initialFilters,
  viewMode: 'gallery',
  isDarkMode: false,
  isLoading: false,
  isEditMode: false,
  isAddMode: false
};

function restaurantReducer(state: RestaurantState, action: RestaurantAction): RestaurantState {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.payload, filteredRestaurants: action.payload };
    
    case 'ADD_RESTAURANT':
      const newRestaurants = [...state.restaurants, action.payload];
      return { ...state, restaurants: newRestaurants, filteredRestaurants: newRestaurants };
    
    case 'UPDATE_RESTAURANT':
      const updatedRestaurants = state.restaurants.map(r => 
        r.id === action.payload.id ? action.payload : r
      );
      return { 
        ...state, 
        restaurants: updatedRestaurants, 
        filteredRestaurants: updatedRestaurants,
        selectedRestaurant: action.payload
      };
    
    case 'DELETE_RESTAURANT':
      const filteredOut = state.restaurants.filter(r => r.id !== action.payload);
      return { 
        ...state, 
        restaurants: filteredOut, 
        filteredRestaurants: filteredOut,
        selectedRestaurant: state.selectedRestaurant?.id === action.payload ? null : state.selectedRestaurant
      };
    
    case 'SET_SELECTED_RESTAURANT':
      return { ...state, selectedRestaurant: action.payload, isEditMode: false };
    
    case 'SET_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      return { ...state, filters: newFilters };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_EDIT_MODE':
      return { ...state, isEditMode: action.payload };
    
    case 'SET_ADD_MODE':
      return { ...state, isAddMode: action.payload };
    
    case 'FILTER_RESTAURANTS':
      const filtered = state.restaurants.filter(restaurant => {
        const matchesSearch = !state.filters.search || 
          restaurant.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          restaurant.city.toLowerCase().includes(state.filters.search.toLowerCase());
        
        const matchesCuisine = !state.filters.cuisine || restaurant.cuisine === state.filters.cuisine;
        const matchesCity = !state.filters.city || restaurant.city === state.filters.city;
        const matchesRating = !state.filters.rating || restaurant.rating >= state.filters.rating;
        const matchesPriceRange = !state.filters.priceRange || restaurant.priceRange === state.filters.priceRange;
        
        const matchesCharacteristics = state.filters.characteristics.length === 0 ||
          state.filters.characteristics.every(char => restaurant.characteristics.includes(char));
        
        return matchesSearch && matchesCuisine && matchesCity && matchesRating && 
               matchesPriceRange && matchesCharacteristics;
      });
      
      return { ...state, filteredRestaurants: filtered };
    
    default:
      return state;
  }
}

const RestaurantContext = createContext<{
  state: RestaurantState;
  dispatch: React.Dispatch<RestaurantAction>;
} | undefined>(undefined);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FILTER_RESTAURANTS' });
  }, [state.filters]);

  useEffect(() => {
    // Apply dark mode to document
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
}