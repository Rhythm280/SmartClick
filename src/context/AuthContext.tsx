import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  experience?: number;
  photographyType?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  age?: number;
  experience?: number;
  photographyType?: string;
  profilePicture?: File;
  portfolioImages?: File[];
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check for a valid token and fetch user data
        const storedUser = localStorage.getItem('smartClickUser');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function - placeholder for JWT auth
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to your backend
      // This is just a placeholder implementation for the frontend
      const mockUser = {
        id: 'user-123',
        name: 'Jane Doe',
        email: email,
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
        experience: 5,
        photographyType: 'Portrait',
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Basic validation
      if (email.trim() === '' || password.trim() === '') {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Store user in localStorage (in a real app, you'd store the JWT token)
      localStorage.setItem('smartClickUser', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call to your backend
      // This is just a placeholder implementation for the frontend
      
      // Basic validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Name, email, and password are required');
      }
      
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        name: userData.name,
        email: userData.email,
        experience: userData.experience,
        photographyType: userData.photographyType,
        profilePicture: userData.profilePicture 
          ? URL.createObjectURL(userData.profilePicture) 
          : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      };
      
      // Store user in localStorage
      localStorage.setItem('smartClickUser', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('smartClickUser');
    setUser(null);
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}