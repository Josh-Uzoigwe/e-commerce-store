import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/20">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-center border border-gray-200 dark:border-slate-700 animate-slide-up transition-colors duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded bg-gray-100 dark:bg-slate-700" />
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-accent font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >-</button>
                  <span className="px-2 text-slate-900 dark:text-white min-w-[2rem] text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-sm underline transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white underline transition-colors">Clear Cart</button>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 sticky top-24 animate-fade-in transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Order Summary</h3>
            <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (Est.)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-slate-600 pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-xl text-accent">${(total * 1.08).toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded hover:bg-slate-700 dark:hover:bg-gray-200 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;