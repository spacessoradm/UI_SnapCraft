import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'set-of-3',
    name: 'Custom Photo Magnets (Set of 3)',
    price: 14.99,
    description: 'Transform your favorite memories into a beautiful set of 3 custom photo magnets.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    type: 'set',
    dimensions: {
      width: 50,
      height: 50
    },
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'set-of-6',
    name: 'Custom Photo Magnets (Set of 6)',
    price: 24.99,
    description: 'Transform your favorite memories into a beautiful set of 6 custom photo magnets.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    type: 'set',
    dimensions: {
      width: 50,
      height: 50
    },
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'set-of-9',
    name: 'Custom Photo Magnets (Set of 9)',
    price: 34.99,
    description: 'Transform your favorite memories into a beautiful set of 9 custom photo magnets.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    type: 'set',
    dimensions: {
      width: 50,
      height: 50
    },
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'puzzle',
    name: 'Custom Photo Puzzle Magnet',
    price: 19.99,
    description: 'Create a unique 9-piece magnetic puzzle from your favorite photo.',
    image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80&w=800',
    type: 'puzzle',
    dimensions: {
      width: 150,
      height: 150
    },
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];