import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any errors
  const navigate = useNavigate();

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Check localStorage
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);

  // Signup method
  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Implement backend API call for signup
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();

      // Handle successful signup by setting user and redirecting
      setUser(data.user);

      // Securely store token in localStorage (replace if using cookies or other methods)
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/profile');
    } catch (error) {
      setError(error.message || 'Signup failed'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  // Login method
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Implement your backend API call for login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Handle successful login by setting user and storing token (if applicable)
      setUser(data.user);

      // Securely store token in localStorage (replace if using cookies or other methods)
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/profile');
    } catch (error) {
      setError(error.message || 'Login failed'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove stored user info
    localStorage.removeItem('token'); // Remove stored token
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
