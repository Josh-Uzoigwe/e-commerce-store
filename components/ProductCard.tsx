import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="group relative bg-white dark:bg-[#0a0a0a] rounded-xl shadow-sm hover:shadow-2xl dark:shadow-black/50 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border border-gray-200 dark:border-gray-800 hover:border-accent/30">
      <div className="w-full h-64 bg-gray-100 dark:bg-[#111] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white dark:bg-accent text-black p-3 rounded-full shadow-lg hover:scale-110"
            title="Quick Add"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
      </div>
      
      <div className="p-5 flex-1 flex flex-col relative z-10">
        <div className="mb-2 flex justify-between items-start">
            <p className="text-[10px] font-bold tracking-widest uppercase text-accent">{product.category}</p>
            <div className="flex items-center">
                <span className="text-accent text-xs">★</span>
                <span className="ml-1 text-xs font-medium text-gray-400">{product.rating}</span>
            </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2 font-serif tracking-tight group-hover:text-accent transition-colors">
            <Link to={`/product/${product.id}`}>
            <span className="absolute inset-0" />
            {product.title}
            </Link>
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-4 font-light">
            {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
          <p className="text-xl font-black text-slate-900 dark:text-white">${product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCart}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg ${
              isAdding 
                ? 'bg-green-500 text-white scale-95 shadow-green-500/30' 
                : 'bg-slate-900 dark:bg-gold-gradient text-white dark:text-black shadow-accent/10 hover:shadow-accent/30 hover:scale-105 active:scale-95'
            }`}
          >
            {isAdding ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;