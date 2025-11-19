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

  if (loading) return (
    <div className="text-center py-20 animate-pulse text-slate-900 dark:text-white flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <span className="text-accent tracking-widest uppercase text-sm">Loading Collection...</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Hero Section - Black & Gold Gradient */}
      <div className="relative rounded-3xl p-10 mb-12 shadow-2xl overflow-hidden animate-slide-up group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-1000"></div>
        
        <div className="relative z-10 flex flex-col items-start max-w-2xl">
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 border-b border-accent pb-1">Exclusive Collection</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Elegance <br/>
            <span className="text-transparent bg-clip-text bg-gold-gradient">Redefined</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 font-light leading-relaxed max-w-lg">
            Discover a curated selection of premium products designed for those who appreciate the finer details in life.
            </p>
            <button onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})} className="bg-gold-gradient text-black font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 transform hover:-translate-y-1">
            Explore Catalog
            </button>
        </div>
      </div>

      <div id="shop" className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-6">
          <div className="bg-white dark:bg-[#0a0a0a] dark:border dark:border-gray-800 p-6 rounded-xl border border-gray-200 shadow-sm sticky top-28 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-accent mb-6 uppercase tracking-wider text-xs border-b border-gray-200 dark:border-gray-700 pb-2">Refine Selection</h3>
            
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

export default Home;