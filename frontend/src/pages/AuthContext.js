import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/signin', { email, password });
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error for handling in the modal
    }
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/signup', { username, email, password });
      setUser(data.user);
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Rethrow the error for handling in the modal
    }
  };

  const logout = () => {
    setUser(null);
    // Implement actual logout logic, e.g., clear session
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
