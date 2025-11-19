import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    card: ''
  });
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(`Order Placed Successfully! Total: $${(total * 1.08).toFixed(2)}`);
    clearCart();
    navigate('/');
  };

  const isValidCard = formData.card.replace(/\s/g, '').length === 16 && !isNaN(Number(formData.card));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-gray-200 dark:border-slate-700 shadow-lg animate-slide-up transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4 text-accent">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
            <input 
              required 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none text-slate-900 dark:text-white transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none text-slate-900 dark:text-white transition-colors" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Address</label>
            <textarea 
              required 
              rows={3}
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none text-slate-900 dark:text-white transition-colors" 
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-accent">Payment</h2>
        <div className="mb-6">
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Card Number (Fake: 16 digits)</label>
          <input 
            required 
            type="text" 
            maxLength={16}
            placeholder="0000 0000 0000 0000"
            value={formData.card}
            onChange={e => setFormData({...formData, card: e.target.value})}
            className={`w-full bg-gray-50 dark:bg-slate-900 border rounded px-3 py-2 focus:outline-none text-slate-900 dark:text-white transition-colors ${isValidCard ? 'border-green-500' : 'border-gray-300 dark:border-slate-600'}`} 
          />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-slate-600">
           <span className="text-xl font-bold text-slate-900 dark:text-white">Total: ${(total * 1.08).toFixed(2)}</span>
           <button 
            type="submit" 
            disabled={processing || !isValidCard}
            className={`bg-accent text-white font-bold py-3 px-8 rounded transition-all ${
              processing || !isValidCard 
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
              : 'hover:bg-blue-600 hover:scale-105 shadow-lg shadow-blue-500/30'
            }`}
           >
             {processing ? 'Processing...' : 'Pay Now'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;