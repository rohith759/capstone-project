import { useState, useEffect, createContext, useContext } from 'react';
import { AuthUser, AuthState, LoginCredentials, RegistrationData } from '../types';

const AuthContext = createContext<{
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Simulate API call to validate token
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data
          const mockUser: AuthUser = {
            id: 'user-1',
            email: 'admin@acme.com',
            name: 'John Administrator',
            role: 'admin',
            tenantId: 'tenant-1',
            tenantName: 'Acme Corporation',
            mfaEnabled: true,
            lastLoginAt: new Date().toISOString(),
            createdAt: '2024-01-15T00:00:00Z',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            preferences: {
              theme: 'light',
              notifications: {
                email: true,
                push: true,
                realTime: true
              },
              language: 'en',
              timezone: 'UTC'
            }
          };
          
          setAuth({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setAuth(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Session validation failed'
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuth(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser: AuthUser = {
        id: 'user-1',
        email: credentials.email,
        name: credentials.email.includes('admin') ? 'John Administrator' : 'Security Analyst',
        role: credentials.email.includes('admin') ? 'admin' : 'analyst',
        tenantId: 'tenant-1',
        tenantName: 'Acme Corporation',
        mfaEnabled: true,
        lastLoginAt: new Date().toISOString(),
        createdAt: '2024-01-15T00:00:00Z',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            realTime: true
          },
          language: 'en',
          timezone: 'UTC'
        }
      };

      localStorage.setItem('auth_token', 'mock_jwt_token');
      
      setAuth({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials'
      }));
    }
  };

  const register = async (data: RegistrationData) => {
    setAuth(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      setAuth(prev => ({ ...prev, isLoading: false }));
      setShowLogin(true); // Show login page after successful registration
      
      // In a real app, you might send a verification email here
      alert('Registration successful! Please log in with your credentials.');
      
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.'
      }));
    }
  };
  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setAuth(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null
    }));
  };

  return {
    auth,
    login,
    register,
    logout,
    updateUser,
    showLogin,
    setShowLogin
  };
};

export { AuthContext };