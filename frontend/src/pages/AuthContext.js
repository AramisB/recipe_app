import React, { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to set the user data
  const login = (userData) => {
    setUser(userData);
    // You can also add more logic here such as saving the user data to localStorage or making an API call
  };

  // Logout function to clear the user data
  const logout = () => {
    setUser(null);
    // You can also add more logic here such as removing the user data from localStorage or making an API call
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };