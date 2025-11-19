import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSupportResponse } from '../services/geminiService';

export const About: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
    <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">About Jojo's Web-Store</h1>
    <div className="prose prose-slate dark:prose-invert">
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        Welcome to <span className="text-accent font-bold">Jojo's Web-Store</span>, the ultimate destination for modern digital lifestyle products. 
        Established in 2024, we bridge the gap between cutting-edge technology and everyday aesthetic.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Our mission is to provide high-quality, curated items that enhance your workspace, home, and style. 
        We believe in a future where commerce is seamless, secure, and intelligent.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 text-center shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="font-bold text-slate-900 dark:text-white">Innovation</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Always ahead of the curve.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 text-center shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-slate-900 dark:text-white">Security</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Client-side encryption.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 text-center shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="text-3xl mb-2">💎</div>
          <h3 className="font-bold text-slate-900 dark:text-white">Quality</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Premium curated selection.</p>
        </div>
      </div>
    </div>
  </div>
);

export const Support: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    const result = await getSupportResponse(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Support Center</h1>
      
      {/* AI Agent Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 mb-12 shadow-xl animate-slide-up">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">🤖</span>
          <div>
            <h2 className="text-2xl font-bold">AI Instant Assistant</h2>
            <p className="text-gray-300 text-sm">Ask about returns, shipping, or product details.</p>
          </div>
        </div>
        
        <form onSubmit={handleAiSubmit} className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="How do I return an item?"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent pr-24"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-2 bg-accent hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-bold transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Ask'}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-slate-700/30 p-4 rounded-lg border border-slate-600 animate-fade-in">
            <p className="leading-relaxed">{response}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Contact Us</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-6">📧</span> support@jojos-webstore.com
            </li>
            <li className="flex items-center">
              <span className="w-6">📞</span> +1 (555) 123-4567
            </li>
            <li className="flex items-center">
              <span className="w-6">📍</span> 123 Tech Avenue, Silicon Valley, CA
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">FAQ</h3>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <summary className="font-medium cursor-pointer p-4 list-none flex justify-between items-center text-slate-900 dark:text-white">
                <span>What is the return policy?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                We accept returns within 30 days of purchase. Items must be unused and in original packaging.
              </div>
            </details>
            <details className="group bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <summary className="font-medium cursor-pointer p-4 list-none flex justify-between items-center text-slate-900 dark:text-white">
                <span>How long does shipping take?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                Standard shipping takes 3-5 business days. Express shipping is available at checkout.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Privacy Policy</h1>
    <div className="prose prose-slate dark:prose-invert text-gray-600 dark:text-gray-300">
      <p>Last updated: 2024</p>
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">2. How We Use Your Information</h3>
      <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">3. Data Security</h3>
      <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
    </div>
  </div>
);

export const TermsOfService: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Terms of Service</h1>
    <div className="prose prose-slate dark:prose-invert text-gray-600 dark:text-gray-300">
      <p>Welcome to Jojo's Web-Store. By accessing our website, you agree to these terms.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">1. Use of Service</h3>
      <p>You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">2. Product Availability</h3>
      <p>All products are subject to availability. We reserve the right to discontinue any product at any time.</p>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">3. Limitation of Liability</h3>
      <p>Jojo's Web-Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
    </div>
  </div>
);