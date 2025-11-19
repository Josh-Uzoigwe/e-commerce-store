import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gold-gradient p-1.5 rounded mr-3 shadow-lg shadow-accent/20">
                <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 10.5V15a3 3 0 0 0 6 0v-7.5a3 3 0 0 1 6 0V12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">JOJO'S</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed">
              Curating the finest digital lifestyle products since 2024. Quality, Elegance, and Innovation in every package.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-accent tracking-widest uppercase mb-6">Shop</h3>
            <ul className="space-y-4">
                <li><Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">New Arrivals</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Best Sellers</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-accent tracking-widest uppercase mb-6">Company</h3>
            <ul className="space-y-4">
                <li><Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-accent tracking-widest uppercase mb-6">Support</h3>
            <ul className="space-y-4">
                <li><Link to="/support" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Customer Service</Link></li>
                <li><Link to="/support" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Returns</Link></li>
                <li><Link to="/support" className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">&copy; {new Date().getFullYear()} Jojo's Web-Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-gray-400 hover:text-accent transition-colors"><span className="sr-only">Facebook</span>FB</a>
             <a href="#" className="text-gray-400 hover:text-accent transition-colors"><span className="sr-only">Twitter</span>TW</a>
             <a href="#" className="text-gray-400 hover:text-accent transition-colors"><span className="sr-only">Instagram</span>IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;