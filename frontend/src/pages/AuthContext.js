// AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const response = await axios.post('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/signin', { email, password });
    setUser(response.data.user);
    // Set token in local storage or context if required
  };

  const signUp = async (email, password) => {
    const response = await axios.post('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/signup', { email, password });
    setUser(response.data.user);
    // Set token in local storage or context if required
  };

  const logout = () => {
    setUser(null);
    // Remove token from local storage or context if required
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
