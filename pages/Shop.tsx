
import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import { ProductCategory, SortOption } from '../types';

const Shop: React.FC = () => {
  const { 
    filteredProducts, 
    loading, 
    filters, 
    setFilters, 
    sortOption, 
    setSortOption 
  } = useProducts();

  const categories = Object.values(ProductCategory);

  if (loading) return (
    <div className="text-center py-20 animate-pulse text-slate-900 dark:text-white flex flex-col items-center min-h-screen justify-center">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <span className="text-accent tracking-widest uppercase text-sm">Loading Collection...</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">The Collection</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-widest">Curated for the exceptional</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-6">
          <div className="bg-white dark:bg-[#0a0a0a] dark:border dark:border-gray-800 p-6 rounded-xl border border-gray-200 shadow-sm sticky top-28 transition-colors">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 className="font-bold text-slate-900 dark:text-accent uppercase tracking-wider text-xs">Refine</h3>
                {(filters.query || filters.category || filters.maxPrice < 1000) && (
                    <button onClick={() => setFilters({ query: '', category: '', minPrice: 0, maxPrice: 1000 })} className="text-[10px] text-red-500 hover:underline">
                        Reset
                    </button>
                )}
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Search</label>
              <input 
                type="text" 
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Keyword..." 
                className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Category</label>
              <div className="space-y-2">
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                  className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${!filters.category ? 'bg-accent text-black font-bold shadow-lg shadow-accent/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  All Items
                </button>
                {categories.map(c => (
                   <button 
                   key={c}
                   onClick={() => setFilters(prev => ({ ...prev, category: c }))}
                   className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${filters.category === c ? 'bg-accent text-black font-bold shadow-lg shadow-accent/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                 >
                   {c}
                 </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Max Price: <span className="text-accent">${filters.maxPrice}</span></label>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

             {/* Sort */}
             <div className="mb-2">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Sort By</label>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="newest">Newest Arrivals</option>
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
            <div className="text-center py-32 text-gray-500 dark:text-gray-400 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800 animate-fade-in">
              <p className="text-xl font-light">No products match your refined taste.</p>
              <button onClick={() => setFilters(prev => ({...prev, query: '', category: ''}))} className="mt-4 text-accent hover:underline">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <div style={{animationDelay: `${idx * 0.05}s`}} className="animate-slide-up" key={product.id}>
                    <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
