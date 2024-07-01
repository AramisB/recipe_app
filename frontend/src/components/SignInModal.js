// SignInModal.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('SignIn error:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
