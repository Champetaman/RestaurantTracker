export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  description: string;
  images: string[];
  dateVisited: string;
  characteristics: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantFilters {
  search: string;
  cuisine: string;
  city: string;
  rating: number;
  characteristics: string[];
  priceRange: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export type ViewMode = 'gallery' | 'list' | 'map';