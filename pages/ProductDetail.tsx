import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { getProductAdvice } from '../services/geminiService';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);

  const product = getProductById(id || '');

  if (!product) {
    return <div className="text-center py-20 animate-fade-in text-slate-900 dark:text-white">Product not found</div>;
  }

  // Client-side similarity Recommendation
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAiAsk = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    const answer = await getProductAdvice(product, aiQuestion);
    setAiResponse(answer);
    setAiLoading(false);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in relative">
      
      {/* Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in cursor-zoom-out"
          onClick={() => setZoomImage(false)}
        >
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl shadow-gold/20 transform transition-transform duration-300 scale-100" 
          />
          <button className="absolute top-4 right-4 text-white text-4xl font-light hover:text-accent transition-colors">&times;</button>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-accent mb-6 flex items-center transition-colors group uppercase tracking-widest text-xs font-bold">
        <span className="group-hover:-translate-x-1 transition-transform mr-2 text-lg">&larr;</span> Back to Collection
      </button>
      
      {/* Main Product Container - Explicit Dark Mode Background */}
      <div className="bg-white dark:bg-[#0a0a0a] dark:border dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-200 animate-slide-up transition-colors duration-300">
        <div className="md:w-1/2 p-8 bg-gray-100 dark:bg-[#050505] flex items-center justify-center relative group overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            onClick={() => setZoomImage(true)}
            className="max-h-96 object-contain rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500 cursor-zoom-in z-10 relative" 
          />
          {/* Decorative Glow behind image */}
          <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md text-accent text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-accent/30">
            Click to Zoom
          </div>
        </div>
        
        <div className="md:w-1/2 p-10 flex flex-col">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-gray-100 dark:bg-accent/10 text-slate-700 dark:text-accent text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-gray-200 dark:border-accent/20">
              {product.category}
            </span>
            <div className="flex items-center text-accent">
              <span className="text-lg">★</span>
              <span className="ml-1 text-slate-900 dark:text-white font-bold text-sm">{product.rating}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-6 leading-tight font-serif">{product.title}</h1>
          <div className="mt-6 flex items-end gap-4">
            <span className="text-3xl font-light text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.stock < 10 && (
              <span className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse mb-1">Only {product.stock} left in stock</span>
            )}
          </div>

          <p className="mt-8 text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light border-l-2 border-accent/50 pl-4">
            {product.description}
          </p>

          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
            <button 
              onClick={handleAddToCart}
              className={`w-full font-bold py-4 px-6 rounded-lg transition-all transform shadow-xl uppercase tracking-[0.15em] text-sm ${
                isAdding 
                ? 'bg-green-600 text-white scale-[0.98] shadow-green-500/20' 
                : 'bg-slate-900 dark:bg-gold-gradient text-white dark:text-black hover:scale-[1.02] shadow-accent/20 hover:shadow-accent/40'
              }`}
            >
              {isAdding ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="mt-12 bg-white dark:bg-[#0a0a0a] dark:border dark:border-gray-800 rounded-xl p-8 border border-gray-200 animate-fade-in transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center relative z-10">
          <span className="text-2xl mr-3 animate-pulse-short">✨</span> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400">Product Concierge</span>
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <div className="flex-1">
            <textarea 
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={`Have questions about the ${product.title}? Ask our AI concierge...`}
              className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-slate-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent h-32 resize-none transition-colors placeholder-gray-500"
            />
            <button 
              onClick={handleAiAsk}
              disabled={aiLoading}
              className="mt-4 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider disabled:opacity-50 transition-colors border border-transparent dark:hover:border-accent/50"
            >
              {aiLoading ? 'Consulting...' : 'Ask Concierge'}
            </button>
          </div>
          {aiResponse && (
            <div className="flex-1 bg-gray-100 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-fade-in">
                <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">Response</span>
                </div>
              <p className="text-slate-800 dark:text-gray-300 italic font-light leading-relaxed">"{aiResponse}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 animate-slide-up">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <span className="w-8 h-px bg-accent mr-4"></span>
            Curated Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;