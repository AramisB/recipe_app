import React, { useState, useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      onClose();
      navigate('/profile'); // Redirect to profile page after successful sign-up
    } catch (error) {
      console.error('SignUp error:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
