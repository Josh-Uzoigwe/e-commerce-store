import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import { ProductCategory, SortOption } from '../types';

const Home: React.FC = () => {
  const { 
    filteredProducts, 
    loading, 
    filters, 
    setFilters, 
    sortOption, 
    setSortOption 
  } = useProducts();

  const categories = Object.values(ProductCategory);

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-10 shadow-xl border border-slate-700">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Jojo's Web-Store</h1>
        <p className="text-gray-300 text-lg">Premium products for a digital lifestyle.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-6">
          <div className="bg-secondary p-5 rounded-lg border border-slate-700 shadow-sm sticky top-24">
            <h3 className="font-bold text-white mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Search</label>
              <input 
                type="text" 
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Keyword..." 
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Price Range: ${filters.maxPrice}</label>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

             {/* Sort */}
             <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Sort By</label>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-secondary rounded-lg">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;