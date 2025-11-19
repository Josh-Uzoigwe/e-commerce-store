import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Invalid credentials or user already exists.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-secondary p-8 rounded-lg shadow-2xl border border-slate-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 focus:border-accent focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-2 rounded transition-colors"
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-gray-500 text-center">
          <p>For demo admin access, register an account with email "admin@jojos.com".</p>
        </div>
      </div>
    </div>
  );
};

export default Login;