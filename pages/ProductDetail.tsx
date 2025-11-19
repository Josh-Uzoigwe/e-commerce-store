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

  const product = getProductById(id || '');

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4 flex items-center">
        &larr; Back
      </button>
      
      <div className="bg-secondary rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-700">
        <div className="md:w-1/2 p-8 bg-gray-800 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-slate-700 text-accent text-xs font-bold rounded-full uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center text-yellow-400">
              <span className="text-lg">★</span>
              <span className="ml-1 text-white font-bold">{product.rating}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mt-4">{product.title}</h1>
          <div className="mt-4">
            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            {product.stock < 10 && (
              <span className="ml-4 text-red-400 text-sm font-medium">Only {product.stock} left!</span>
            )}
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="mt-10 bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">✨</span> Smart Assistant
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <textarea 
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={`Ask about the ${product.title}... (e.g., "Is this good for gaming?" or "How do I clean this?")`}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent h-32 resize-none"
            />
            <button 
              onClick={handleAiAsk}
              disabled={aiLoading}
              className="mt-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
          {aiResponse && (
            <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-slate-600 animate-fade-in">
              <p className="text-gray-200 italic">"{aiResponse}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
