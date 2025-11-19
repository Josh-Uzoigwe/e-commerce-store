import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, FilterState, SortOption } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

// Backend API URL
const API_URL = 'http://localhost:3001/api';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000
  });
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const syncLocal = (currentProducts: Product[]) => {
    localStorage.setItem('jojo_products', JSON.stringify(currentProducts));
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      syncLocal(data);
    } catch (error) {
      console.warn("Backend unavailable, switching to offline mode.");
      const local = localStorage.getItem('jojo_products');
      if (local) {
        setProducts(JSON.parse(local));
      } else {
        setProducts(INITIAL_PRODUCTS);
        syncLocal(INITIAL_PRODUCTS);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    // Optimistic update
    const newProducts = [...products, product];
    setProducts(newProducts);
    syncLocal(newProducts);

    try {
      await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
    } catch (err) {
      console.warn('Backend add failed, kept local change.');
    }
  };

  const updateProduct = async (updated: Product) => {
    const newProducts = products.map(p => p.id === updated.id ? updated : p);
    setProducts(newProducts);
    syncLocal(newProducts);

    try {
      await fetch(`${API_URL}/products/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
       console.warn('Backend update failed, kept local change.');
    }
  };

  const deleteProduct = async (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    syncLocal(newProducts);

    try {
      await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Backend delete failed, kept local change.');
    }
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  const getFilteredProducts = useCallback(() => {
    let res = products.filter(p => {
      const matchesQuery = p.title.toLowerCase().includes(filters.query.toLowerCase()) || 
                           p.description.toLowerCase().includes(filters.query.toLowerCase());
      const matchesCategory = filters.category ? p.category === filters.category : true;
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      
      return matchesQuery && matchesCategory && matchesPrice;
    });

    switch (sortOption) {
      case 'price-asc':
        res.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        res.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        res.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        res.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }
    return res;
  }, [products, filters, sortOption]);

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts: getFilteredProducts(),
      loading,
      filters,
      setFilters,
      sortOption,
      setSortOption,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};