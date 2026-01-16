import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('sareestyle-token');
    const userData = localStorage.getItem('sareestyle-user');
    
    if (token && userData) {
      setAuthState({
        user: JSON.parse(userData),
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: '1',
        name: 'Customer User',
        email,
      };

      localStorage.setItem('sareestyle-token', 'mock-token');
      localStorage.setItem('sareestyle-user', JSON.stringify(user));
      
      setAuthState({ user, isLoading: false });
      return true;
    } catch (error) {
      return false;
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin login (admin@sareestyle.com / admin123)
      if (email === 'admin@srilakshira.com' && password === 'admin123') {
        const user: User = {
          id: 'admin-1',
          name: 'Admin User',
          email,
          isAdmin: true,
        };

        localStorage.setItem('sareestyle-token', 'mock-admin-token');
        localStorage.setItem('sareestyle-user', JSON.stringify(user));
        
        setAuthState({ user, isLoading: false });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
      };

      localStorage.setItem('sareestyle-token', 'mock-token');
      localStorage.setItem('sareestyle-user', JSON.stringify(user));
      
      setAuthState({ user, isLoading: false });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('sareestyle-token');
    localStorage.removeItem('sareestyle-user');
    setAuthState({ user: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      isLoading: authState.isLoading,
      login,
      adminLogin,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};