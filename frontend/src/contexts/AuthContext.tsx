import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

import type { User, UserRole, RegisterData } from '../types/auth';
import { login, logout, register, getCurrentUser } from '../api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to authenticate', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const { key, user } = await login(username, password);
    localStorage.setItem('authToken', key);
    setUser(user);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const handleRegister = async (data: RegisterData) => {
    const { key, user } = await register(data);
    localStorage.setItem('authToken', key);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
