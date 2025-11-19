export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home',
  SPORTS = 'Sports',
  BOOKS = 'Books'
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  stock: number;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface FilterState {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';
