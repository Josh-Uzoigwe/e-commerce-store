
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const navigate = useNavigate();

  // Trigger animation when itemCount changes
  useEffect(() => {
    if (itemCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 400);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/90 dark:bg-black/80 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gold/10 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              {/* Logo Icon - Gold Gradient */}
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-700 p-2 rounded-lg mr-3 shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40 transition-all duration-300 transform group-hover:rotate-3 border border-yellow-300/30">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 10.5V15a3 3 0 0 0 6 0v-7.5a3 3 0 0 1 6 0V12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-black text-2xl tracking-tight leading-none group-hover:text-accent transition-colors">
                  JOJO'S
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-accent font-semibold">Luxury Store</span>
              </div>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/shop" className="border-transparent text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent inline-flex items-center px-1 pt-1 text-sm font-medium transition-all hover:tracking-wide">
                Shop
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="border-transparent text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent inline-flex items-center px-1 pt-1 text-sm font-medium transition-all hover:tracking-wide">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link 
              to="/cart" 
              className={`relative p-2 transition-colors ${animateCart ? 'text-accent' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <span className="sr-only">View cart</span>
              <svg className={`h-6 w-6 transform transition-transform duration-300 ${animateCart ? 'scale-110' : 'scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className={`absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-gold-gradient text-white text-xs font-bold shadow-sm transition-transform duration-300 ${animateCart ? 'animate-bounce-short' : ''}`}>
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Welcome</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-accent">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-slate-900 dark:bg-gold-gradient hover:bg-slate-700 dark:hover:brightness-110 text-white dark:text-black text-sm font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={toggleTheme} className="p-2 mr-2 text-gray-400">
               {theme === 'dark' ? '☀️' : '🌙'}
            </button>
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
      <div className={`${mobileOpen ? 'block' : 'hidden'} sm:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 animate-slide-up`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/shop" className="bg-gray-50 dark:bg-gray-900 border-accent text-accent block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Shop</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Dashboard</Link>
          )}
          {user ? (
             <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
               <div className="px-4 py-2">
                 <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                 <p className="text-sm font-bold text-slate-900 dark:text-accent">{user.name}</p>
               </div>
               <button onClick={handleLogout} className="w-full text-left border-transparent text-red-500 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Logout</button>
             </div>
          ) : (
            <Link to="/login" className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
