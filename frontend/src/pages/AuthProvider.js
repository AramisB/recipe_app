import React, { createContext, useState, useEffect } from 'react';

// Define the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return user;
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (age, sex, profilePic) => {
    try {
      const formData = new FormData();
      formData.append('age', age);
      formData.append('sex', sex);
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      const response = await fetch('https://king-prawn-app-gsvdf.ondigitalocean.app/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, error, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
