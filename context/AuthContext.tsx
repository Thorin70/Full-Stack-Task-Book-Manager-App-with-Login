
import React, { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { api } from '../services/api';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: Pick<User, 'username' | 'password'>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = useCallback(async (credentials: Pick<User, 'username' | 'password'>) => {
    const { token: newToken } = await api.login(credentials);
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
