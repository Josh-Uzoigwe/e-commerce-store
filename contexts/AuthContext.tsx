import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { hashPassword } from '../services/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
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
    const usersStr = localStorage.getItem('jojo_users_db');
    const users = usersStr ? JSON.parse(usersStr) : {};
    
    const hashedPass = await hashPassword(pass);
    const storedCreds = users[email];

    if (storedCreds && storedCreds.password === hashedPass) {
      const userData: User = {
        id: storedCreds.id,
        name: storedCreds.name,
        email: email,
        isAdmin: email.includes('admin') // Simple mock admin logic based on email
      };
      setUser(userData);
      localStorage.setItem('jojo_user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    const usersStr = localStorage.getItem('jojo_users_db');
    const users = usersStr ? JSON.parse(usersStr) : {};

    if (users[email]) throw new Error('User exists');

    const hashedPass = await hashPassword(pass);
    const newUser = {
      id: Date.now().toString(),
      name,
      password: hashedPass
    };

    users[email] = newUser;
    localStorage.setItem('jojo_users_db', JSON.stringify(users));
    
    // Auto login
    const userData: User = {
        id: newUser.id,
        name: name,
        email: email,
        isAdmin: email.includes('admin')
    };
    setUser(userData);
    localStorage.setItem('jojo_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jojo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};