
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* High quality aesthetic dark background image */}
            <img 
                src="https://image.pollinations.ai/prompt/cinematic%20abstract%20flowing%20black%20liquid%20gold%20waves%20luxury%20dark%20background%208k%20depth%20of%20field" 
                alt="Hero Background" 
                className="w-full h-full object-cover opacity-60 transform scale-105 animate-pulse-slow"
            />
            {/* Enhanced Gradients for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-black/60"></div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold mb-4 block animate-slide-up" style={{animationDelay: '0.1s'}}>Since 2024</span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight font-serif animate-slide-up drop-shadow-2xl" style={{animationDelay: '0.2s'}}>
             Elegance <br/>
             <span className="text-transparent bg-clip-text bg-gold-gradient filter drop-shadow-lg">Redefined</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-2xl mx-auto animate-slide-up drop-shadow-md" style={{animationDelay: '0.3s'}}>
                Discover a curated universe of premium electronics, fashion, and lifestyle essentials designed for the modern connoisseur.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
                <Link 
                    to="/shop" 
                    className="bg-gold-gradient text-black font-bold px-10 py-4 rounded-full hover:brightness-110 transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 transform hover:-translate-y-1"
                >
                    Explore Collection
                </Link>
                <Link 
                    to="/about" 
                    className="bg-black/30 backdrop-blur-sm border border-gray-500/50 text-white px-10 py-4 rounded-full hover:bg-white/10 transition-all hover:border-white"
                >
                    Our Story
                </Link>
            </div>
        </div>
      </div>

      {/* CATEGORY SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Curated Categories</h2>
                <p className="text-gray-500 mt-2">Select your interest</p>
            </div>
            <Link to="/shop" className="text-accent font-bold uppercase tracking-widest text-xs hover:underline">View All &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link to="/shop" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://image.pollinations.ai/prompt/high%20end%20tech%20gadgets%20minimalist%20dark%20setup" alt="Tech" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">Technology</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Future-proof essentials.</p>
                </div>
            </Link>

            {/* Card 2 */}
            <Link to="/shop" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://image.pollinations.ai/prompt/luxury%20fashion%20streetwear%20dark%20aesthetic%20model" alt="Fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">Fashion</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Statement pieces.</p>
                </div>
            </Link>

            {/* Card 3 */}
            <Link to="/shop" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://image.pollinations.ai/prompt/modern%20interior%20design%20living%20room%20dark%20luxury" alt="Home" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">Home & Lifestyle</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Elevate your space.</p>
                </div>
            </Link>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-white dark:bg-[#050505] py-24 border-y border-gray-100 dark:border-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="p-6">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💎</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Premium Quality</h3>
                      <p className="text-gray-500 leading-relaxed">Every item in our catalog is hand-picked for superior craftsmanship and durability.</p>
                  </div>
                  <div className="p-6">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🛡️</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Secure Crypto Payments</h3>
                      <p className="text-gray-500 leading-relaxed">Experience the future of shopping with secure Ethereum transactions on the blockchain.</p>
                  </div>
                  <div className="p-6">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✨</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Concierge</h3>
                      <p className="text-gray-500 leading-relaxed">Our Gemini-powered AI assistant is ready to help you find exactly what you need.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* NEWSLETTER */}
      <div className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto bg-gold-gradient rounded-3xl p-12 text-center shadow-2xl shadow-accent/20 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Join the Inner Circle</h2>
                <p className="text-black/80 mb-8 max-w-lg mx-auto font-medium">Subscribe to receive exclusive offers, early access to drops, and curated style tips.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input type="email" placeholder="Your email address" className="px-6 py-3 rounded-full border-none focus:ring-2 focus:ring-black/20 outline-none w-full text-black" />
                    <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors">Subscribe</button>
                </div>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Home;
