import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, FilterState, ProductCategory, SortOption } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
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

  // Load from LS or Init
  useEffect(() => {
    const stored = localStorage.getItem('jojo_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('jojo_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    setLoading(false);
  }, []);

  // Sync to LS
  useEffect(() => {
    if (!loading && products.length > 0) {
      localStorage.setItem('jojo_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
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
      default:
        // Assuming standard order is ID or generic
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