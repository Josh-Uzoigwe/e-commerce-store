import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div className="w-full h-48 bg-gray-700 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-accent uppercase tracking-wide font-bold">{product.category}</p>
            <h3 className="mt-1 text-lg font-semibold text-white leading-tight truncate" title={product.title}>
              <Link to={`/product/${product.id}`}>
                <span className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
          </div>
          <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
        </div>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2 flex-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="ml-1 text-sm text-gray-300">{product.rating}</span>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-accent hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-500/30"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
