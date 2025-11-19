import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Safe environment access helper
  const getEnvClientId = () => {
    try {
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        return import.meta.env.VITE_GOOGLE_CLIENT_ID;
      }
    } catch (e) { return undefined; }
    return undefined;
  };

  const clientId = getEnvClientId();
  const hasGoogleId = clientId && clientId !== "MOCK_ID_FOR_DEMO";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 w-full max-w-md animate-slide-up transition-colors duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-3 rounded mb-4 text-sm text-center animate-pulse border border-red-200 dark:border-red-500/50">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="animate-fade-in">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-slate-900 dark:text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-slate-900 dark:text-white focus:border-accent focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-slate-900 dark:text-white focus:border-accent focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-2.5 rounded transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or continue with</span>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        </div>

        <div className="flex justify-center w-full">
           {!hasGoogleId ? (
               <div className="w-full text-center bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                   <div className="flex flex-col items-center">
                        <span className="text-2xl mb-2 opacity-50">🔒</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                            Google Sign-In requires configuration
                        </p>
                        <code className="text-[10px] bg-gray-100 dark:bg-black/40 px-2 py-1 rounded text-accent font-mono break-all">
                          VITE_GOOGLE_CLIENT_ID
                        </code>
                   </div>
               </div>
           ) : (
               <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                        await googleLogin(credentialResponse.credential);
                        navigate('/');
                    }
                }}
                onError={() => {
                    setError('Google Login Failed');
                }}
                theme="filled_black"
                shape="pill"
                size="large"
                width="300"
               />
           )}
        </div>

        <div className="mt-6 text-center border-t border-gray-200 dark:border-slate-700 pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="ml-2 text-accent hover:text-slate-900 dark:hover:text-white font-medium transition-colors underline decoration-transparent hover:decoration-current"
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        {!isRegister && (
           <div className="mt-4 p-3 bg-gray-100 dark:bg-slate-800/50 rounded border border-gray-200 dark:border-slate-700 text-xs text-gray-500 text-center">
             <p>Admin Demo: <span className="font-mono font-bold">admin@jojos.com</span> / <span className="font-mono font-bold">admin123</span></p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Login;