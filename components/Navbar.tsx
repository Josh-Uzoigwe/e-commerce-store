import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-secondary sticky top-0 z-50 border-b border-slate-700 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              {/* Logo Icon */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 rounded-lg mr-2 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:rotate-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 10.5V15a3 3 0 0 0 6 0v-7.5a3 3 0 0 1 6 0V12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                </svg>
              </div>
              <span className="text-white font-black text-2xl tracking-tight group-hover:text-accent transition-colors">
                JOJO'S
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-300 hover:text-white hover:border-accent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all">
                Shop
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="border-transparent text-gray-300 hover:text-white hover:border-accent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">View cart</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-accent text-white text-xs font-bold shadow-sm animate-pulse-short">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                <div className="flex flex-col text-right">
                  <span className="text-xs text-gray-400">Welcome back,</span>
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-sm text-gray-400 hover:text-white hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <Link to="/cart" className="relative p-2 mr-2 text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-secondary bg-accent text-white text-xs text-center leading-tight">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={mobileOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={mobileOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileOpen ? 'block' : 'hidden'} sm:hidden bg-secondary border-t border-slate-700`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className="bg-slate-800/50 border-accent text-accent block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Shop</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="border-transparent text-gray-300 hover:bg-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</Link>
          )}
          {user ? (
             <div className="border-t border-slate-700 mt-2 pt-2">
               <div className="px-4 py-2">
                 <p className="text-sm text-gray-400">Signed in as</p>
                 <p className="text-sm font-bold text-white">{user.name}</p>
               </div>
               <button onClick={handleLogout} className="w-full text-left border-transparent text-red-400 hover:bg-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Logout</button>
             </div>
          ) : (
            <Link to="/login" className="border-transparent text-gray-300 hover:bg-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;