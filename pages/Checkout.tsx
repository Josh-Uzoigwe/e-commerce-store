import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { connectWallet, sendPayment, WalletState } from '../services/cryptoService';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [wallet, setWallet] = useState<WalletState>({ address: null, balance: null, isConnected: false });
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    card: ''
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  const handleConnectWallet = async () => {
    setError('');
    try {
      const walletData = await connectWallet();
      setWallet(walletData);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const finalTotal = total * 1.08; // Including Tax
      
      if (paymentMethod === 'crypto') {
        if (!wallet.isConnected) throw new Error("Please connect your wallet first");
        
        // Trigger Blockchain Transaction
        await sendPayment(finalTotal, `ORDER-${Date.now()}`);
        
        alert(`Crypto Payment Successful! Transaction Hash generated.`);
      } else {
        // Simulate Card API Call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      alert(`Order Placed Successfully! Total: $${finalTotal.toFixed(2)}`);
      clearCart();
      navigate('/');
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const isValidCard = formData.card.replace(/\s/g, '').length === 16 && !isNaN(Number(formData.card));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Checkout</h1>
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-gray-200 dark:border-slate-700 shadow-lg animate-slide-up transition-colors duration-300">
        
        {/* Shipping Section */}
        <h2 className="text-xl font-bold mb-4 text-accent">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        {/* Payment Method Toggle */}
        <h2 className="text-xl font-bold mb-4 text-accent">Payment Method</h2>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
              paymentMethod === 'card' 
              ? 'bg-slate-100 dark:bg-slate-700 border-accent text-accent font-bold' 
              : 'border-gray-200 dark:border-slate-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            💳 Credit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('crypto')}
            className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
              paymentMethod === 'crypto' 
              ? 'bg-slate-100 dark:bg-slate-700 border-accent text-accent font-bold' 
              : 'border-gray-200 dark:border-slate-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            🦊 Pay with Crypto (ETH)
          </button>
        </div>

        {/* Error Message */}
        {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          {paymentMethod === 'card' ? (
            <div className="mb-6 animate-fade-in">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Card Number (Fake: 16 digits)</label>
              <input 
                required={paymentMethod === 'card'}
                type="text" 
                maxLength={16}
                placeholder="0000 0000 0000 0000"
                value={formData.card}
                onChange={e => setFormData({...formData, card: e.target.value})}
                className={`w-full bg-gray-50 dark:bg-slate-900 border rounded px-3 py-2 focus:outline-none text-slate-900 dark:text-white transition-colors ${isValidCard ? 'border-green-500' : 'border-gray-300 dark:border-slate-600'}`} 
              />
            </div>
          ) : (
            <div className="mb-6 animate-fade-in bg-gray-50 dark:bg-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
              {!wallet.isConnected ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect your MetaMask wallet to pay securely with Ethereum.</p>
                  <button 
                    type="button"
                    onClick={handleConnectWallet}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-lg"
                  >
                    Connect MetaMask
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Wallet:</span>
                        <span className="text-sm font-mono bg-gray-200 dark:bg-black px-2 py-1 rounded text-slate-900 dark:text-white">
                            {wallet.address?.slice(0,6)}...{wallet.address?.slice(-4)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Balance:</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {parseFloat(wallet.balance || '0').toFixed(4)} ETH
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm font-bold text-accent">Est. Cost:</span>
                        <span className="text-sm font-bold text-accent">
                            {((total * 1.08) / 3500).toFixed(5)} ETH
                        </span>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-2">Exchange Rate: 1 ETH ≈ $3,500 USD</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-slate-600">
             <div className="flex flex-col">
                 <span className="text-xl font-bold text-slate-900 dark:text-white">Total: ${(total * 1.08).toFixed(2)}</span>
                 <span className="text-xs text-gray-500">Including Tax</span>
             </div>
             <button 
              type="submit" 
              disabled={processing || (paymentMethod === 'card' && !isValidCard) || (paymentMethod === 'crypto' && !wallet.isConnected)}
              className={`bg-accent text-white font-bold py-3 px-8 rounded transition-all ${
                processing || (paymentMethod === 'card' && !isValidCard) || (paymentMethod === 'crypto' && !wallet.isConnected)
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'hover:bg-blue-600 hover:scale-105 shadow-lg shadow-blue-500/30'
              }`}
             >
               {processing ? 'Processing...' : (paymentMethod === 'crypto' ? 'Pay with ETH' : 'Pay Now')}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;