import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../constants';
import { storage } from '../services/storage';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = storage.get<User | null>('auth_user', null);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (username: string, pass: string): boolean => {
    // Simulated secure check
    if (username === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      const newUser: User = { username, role: 'admin' };
      setUser(newUser);
      storage.set('auth_user', newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    storage.remove('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};