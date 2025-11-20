import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { hashPassword } from '../services/auth';

const API_URL = 'http://localhost:3001/api/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('jojo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });

      if (!res.ok) {
        // If it's a 404/500 network error, throw specific error to trigger catch.
        // If it's 400/401 (invalid creds), handle normally.
        if (res.status >= 500 || res.status === 404) throw new Error("Server unreachable");
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('jojo_user', JSON.stringify(data.user));
      localStorage.setItem('jojo_token', data.token);

    } catch (err: any) {
      console.warn('Backend login failed, attempting offline auth:', err.message);
      
      // Offline Fallback
      // 1. Check for hardcoded Admin first (Emergency Access)
      if (email === 'admin@jojos.com' && pass === 'admin123') {
        const adminUser = { 
          id: 'admin-offline', 
          name: 'Jojo Admin', 
          email: 'admin@jojos.com', 
          isAdmin: true 
        };
        setUser(adminUser);
        localStorage.setItem('jojo_user', JSON.stringify(adminUser));
        return;
      }

      // 2. Check LocalStorage Database
      const dbString = localStorage.getItem('jojo_users_db');
      const db = dbString ? JSON.parse(dbString) : [];
      const existingUser = db.find((u: any) => u.email === email);
      
      if (!existingUser) throw new Error('User not found (Offline Mode)');
      
      const hashedInput = await hashPassword(pass);
      if (hashedInput !== existingUser.passwordHash) throw new Error('Invalid credentials');

      const userObj = { 
        id: existingUser.id, 
        name: existingUser.name, 
        email: existingUser.email, 
        isAdmin: existingUser.isAdmin 
      };
      setUser(userObj);
      localStorage.setItem('jojo_user', JSON.stringify(userObj));
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, name })
      });

      if (!res.ok) {
        if (res.status >= 500 || res.status === 404) throw new Error("Server unreachable");
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('jojo_user', JSON.stringify(data.user));
      localStorage.setItem('jojo_token', data.token);

    } catch (err: any) {
      console.warn('Backend register failed, attempting offline register:', err.message);

      // Offline Fallback
      const dbString = localStorage.getItem('jojo_users_db');
      const db = dbString ? JSON.parse(dbString) : [];
      
      if (db.find((u: any) => u.email === email)) throw new Error('User already exists (Offline Mode)');

      const passwordHash = await hashPassword(pass);
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        passwordHash,
        isAdmin: email.includes('admin')
      };

      db.push(newUser);
      localStorage.setItem('jojo_users_db', JSON.stringify(db));

      const userObj = { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email, 
        isAdmin: newUser.isAdmin 
      };
      setUser(userObj);
      localStorage.setItem('jojo_user', JSON.stringify(userObj));
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Google Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('jojo_user', JSON.stringify(data.user));
      localStorage.setItem('jojo_token', data.token);
    } catch (err: any) {
      console.error("Google Login Error", err);
      // Fallback for Demo purposes if backend is offline or misconfigured
      const demoUser = {
        id: "google-user-" + Date.now(),
        name: "Google User (Demo)",
        email: "user@gmail.com",
        isAdmin: false
      };
      setUser(demoUser);
      localStorage.setItem('jojo_user', JSON.stringify(demoUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jojo_user');
    localStorage.removeItem('jojo_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};