
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 rounded-lg mr-2 shadow-lg shadow-blue-500/20">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 10.5V15a3 3 0 0 0 6 0v-7.5a3 3 0 0 1 6 0V12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">JOJO'S</h2>
            </div>
            <p className="text-gray-400 text-sm">The coolest products for the modern web era.</p>
          </div>
          <div className="flex space-x-8">
            <Link to="/about" onClick={(e) => {}} className="text-sm text-gray-400 hover:text-accent transition-colors">About</Link>
            <Link to="/support" onClick={(e) => {}} className="text-sm text-gray-400 hover:text-accent transition-colors">Support</Link>
            <Link to="/privacy" onClick={(e) => {}} className="text-sm text-gray-400 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" onClick={(e) => {}} className="text-sm text-gray-400 hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Jojo's Web-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;