import React, { useState } from 'react';
import { getSupportResponse } from '../services/geminiService';

export const About: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
    <h1 className="text-4xl font-bold mb-6 text-white">About Jojo's Web-Store</h1>
    <div className="prose prose-invert">
      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
        Welcome to <span className="text-accent font-bold">Jojo's Web-Store</span>, the ultimate destination for modern digital lifestyle products. 
        Established in 2024, we bridge the gap between cutting-edge technology and everyday aesthetic.
      </p>
      <p className="text-gray-400 leading-relaxed mb-6">
        Our mission is to provide high-quality, curated items that enhance your workspace, home, and style. 
        We believe in a future where commerce is seamless, secure, and intelligent.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-secondary p-6 rounded-lg border border-slate-700 text-center">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="font-bold text-white">Innovation</h3>
          <p className="text-sm text-gray-400 mt-2">Always ahead of the curve.</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg border border-slate-700 text-center">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-white">Security</h3>
          <p className="text-sm text-gray-400 mt-2">Client-side encryption.</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg border border-slate-700 text-center">
          <div className="text-3xl mb-2">💎</div>
          <h3 className="font-bold text-white">Quality</h3>
          <p className="text-sm text-gray-400 mt-2">Premium curated selection.</p>
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
    
    const aiReply = await getSupportResponse(query);
    setResponse(aiReply);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-white">Support Center</h1>
      
      {/* AI Assistant Section */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-600 mb-10 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="bg-accent/20 p-2 rounded-lg mr-3">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Instant Assistant</h2>
            <p className="text-sm text-gray-400">Describe your issue for an immediate response.</p>
          </div>
        </div>

        <form onSubmit={handleAiSubmit} className="space-y-4">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your issue here (e.g., 'My order is late' or 'How do I return an item?')..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent h-24 resize-none transition-all"
          />
          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-accent hover:bg-blue-600 disabled:bg-slate-700 disabled:text-gray-500 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
            >
              {loading ? 'Analyzing...' : 'Get Instant Help'}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-6 bg-secondary border-l-4 border-accent p-4 rounded-r-lg animate-fade-in">
            <p className="text-sm text-accent font-bold mb-1">Jojo's Support Agent:</p>
            <p className="text-gray-200 leading-relaxed">{response}</p>
          </div>
        )}
      </div>

      {/* Traditional Contact Info */}
      <div className="bg-secondary p-8 rounded-lg border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Other Ways to Contact Us</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-slate-800 p-3 rounded-full mr-4 text-xl">📧</div>
            <div>
              <h3 className="font-bold text-white text-lg">Email Us</h3>
              <p className="text-gray-400">support@jojos-webstore.com</p>
              <p className="text-xs text-gray-500 mt-1">Response time: &lt; 24 hours</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-slate-800 p-3 rounded-full mr-4 text-xl">📞</div>
            <div>
              <h3 className="font-bold text-white text-lg">Call Us</h3>
              <p className="text-gray-400">+1 (555) 123-JOJO</p>
              <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-gray-300 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
    <p className="mb-6 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
    
    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3">1. Data Collection</h2>
      <p className="mb-4 leading-relaxed">
        We collect information necessary to process your orders and improve your shopping experience. 
        This includes name, email, and shipping address. We do not store credit card details; 
        payments are processed securely via client-side simulation for this demo.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3">2. Local Storage</h2>
      <p className="mb-4 leading-relaxed">
        Jojo's Web-Store uses your browser's <code>LocalStorage</code> to remember your shopping cart, login session tokens, and user preferences. 
        This data resides entirely on your device and is not transmitted to any external server in this demo environment.
      </p>
    </section>
    
    <section>
      <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Services</h2>
      <p className="mb-4 leading-relaxed">
        We use simulated AI services for product recommendations. No personal data is used for training external models.
      </p>
    </section>
  </div>
);

export const TermsOfService: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-gray-300 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>
    
    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4 leading-relaxed">
        By accessing Jojo's Web-Store website, you agree to be bound by these terms of service, all applicable laws and regulations, 
        and agree that you are responsible for compliance with any applicable local laws.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3">2. Use License</h2>
      <p className="mb-4 leading-relaxed">
        Permission is granted to temporarily download one copy of the materials (information or software) on Jojo's Web-Store's website for personal, non-commercial transitory viewing only.
      </p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>You may not modify or copy the materials.</li>
        <li>You may not use the materials for any commercial purpose.</li>
        <li>You may not attempt to decompile or reverse engineer any software contained on Jojo's Web-Store's website.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold text-white mb-3">3. Disclaimer</h2>
      <p className="mb-4 leading-relaxed">
        The materials on Jojo's Web-Store's website are provided on an 'as is' basis. Jojo's Web-Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>
    </section>
  </div>
);