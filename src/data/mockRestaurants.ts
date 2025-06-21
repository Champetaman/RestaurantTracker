import { Restaurant } from '../types/restaurant';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Casa San Isidro',
    cuisine: 'Colombian',
    address: 'Calle 35 #6-16, La Candelaria',
    city: 'Bogotá',
    coordinates: { lat: 4.5981, lng: -74.0758 },
    rating: 4.5,
    description: 'Charming colonial restaurant in La Candelaria serving traditional Colombian dishes with a modern twist.',
    images: [
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
      'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg'
    ],
    dateVisited: '2024-01-15',
    characteristics: ['cozy', 'historic', 'date night', 'traditional'],
    priceRange: '$$',
    tags: ['bandeja paisa', 'ajiaco', 'romantic'],
    notes: 'Amazing ajiaco soup and beautiful colonial architecture. Perfect for a romantic dinner.',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    address: 'Carrera 11 #93-07, Zona Rosa',
    city: 'Bogotá',
    coordinates: { lat: 4.6753, lng: -74.0498 },
    rating: 4.8,
    description: 'Authentic Japanese sushi bar with fresh fish and traditional preparation methods.',
    images: [
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
      'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg'
    ],
    dateVisited: '2024-02-03',
    characteristics: ['modern', 'upscale', 'fresh seafood', 'sake bar'],
    priceRange: '$$$',
    tags: ['omakase', 'nigiri', 'sake pairing'],
    notes: 'Incredible omakase experience. The chef was very knowledgeable about each fish.',
    createdAt: '2024-02-03',
    updatedAt: '2024-02-03'
  },
  {
    id: '3',
    name: 'Café Revolución',
    cuisine: 'Coffee & Brunch',
    address: 'Calle 9 #8-34, El Poblado',
    city: 'Medellín',
    coordinates: { lat: 6.2077, lng: -75.5636 },
    rating: 4.3,
    description: 'Hip coffee roastery with amazing Colombian single-origin beans and delicious brunch options.',
    images: [
      'https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg',
      'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg'
    ],
    dateVisited: '2024-02-20',
    characteristics: ['cozy', 'casual', 'coffee specialty', 'outdoor seating'],
    priceRange: '$',
    tags: ['specialty coffee', 'brunch', 'wifi'],
    notes: 'Great place to work with laptop. Their Colombian Geisha coffee is exceptional.',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  {
    id: '4',
    name: 'El Cielo',
    cuisine: 'Fine Dining',
    address: 'Carrera 13 #85-32, Zona Rosa',
    city: 'Bogotá',
    coordinates: { lat: 4.6732, lng: -74.0524 },
    rating: 5.0,
    description: 'Michelin-level fine dining experience featuring innovative Colombian cuisine with molecular gastronomy.',
    images: [
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    ],
    dateVisited: '2024-03-10',
    characteristics: ['upscale', 'innovative', 'date night', 'tasting menu'],
    priceRange: '$$$$',
    tags: ['molecular gastronomy', 'tasting menu', 'wine pairing'],
    notes: 'Absolutely incredible experience. Every dish was a work of art. Anniversary dinner perfection.',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10'
  },
  {
    id: '5',
    name: 'La Pizzería de Nápoles',
    cuisine: 'Italian',
    address: 'Calle 70 #10-15, Chapinero',
    city: 'Bogotá',
    coordinates: { lat: 4.6533, lng: -74.0628 },
    rating: 4.2,
    description: 'Authentic Neapolitan pizza with wood-fired oven and imported Italian ingredients.',
    images: [
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg'
    ],
    dateVisited: '2024-01-28',
    characteristics: ['casual', 'family-friendly', 'authentic', 'wood-fired'],
    priceRange: '$$',
    tags: ['neapolitan pizza', 'family-friendly', 'casual'],
    notes: 'Great thin crust pizza. Kids loved it too. Good value for money.',
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28'
  },
  {
    id: '6',
    name: 'Oci.Mde',
    cuisine: 'Contemporary',
    address: 'Carrera 35 #8A-26, El Poblado',
    city: 'Medellín',
    coordinates: { lat: 6.2088, lng: -75.5647 },
    rating: 4.7,
    description: 'Contemporary restaurant showcasing local ingredients with international techniques.',
    images: [
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg',
      'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg'
    ],
    dateVisited: '2024-02-25',
    characteristics: ['modern', 'innovative', 'local ingredients', 'trendy'],
    priceRange: '$$$',
    tags: ['local ingredients', 'creative', 'trendy'],
    notes: 'Amazing use of local Colombian ingredients in unexpected ways. Very creative chef.',
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25'
  }
];

export const availableCharacteristics = [
  'cozy', 'modern', 'upscale', 'casual', 'romantic', 'date night', 
  'family-friendly', 'outdoor seating', 'historic', 'trendy', 
  'innovative', 'traditional', 'fresh seafood', 'coffee specialty',
  'wine bar', 'sake bar', 'tasting menu', 'wood-fired', 'authentic',
  'local ingredients'
];

export const availableCuisines = [
  'Colombian', 'Japanese', 'Italian', 'Mexican', 'French', 'American',
  'Thai', 'Indian', 'Chinese', 'Mediterranean', 'Contemporary', 
  'Fine Dining', 'Coffee & Brunch', 'Seafood', 'Steakhouse'
];