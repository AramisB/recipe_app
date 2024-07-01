import React, { useState, useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/modal.css';

const SignInSignUpModal = ({ isOpen, onClose, initialFormType }) => {
  const [formType, setFormType] = useState(initialFormType);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'signUp') {
        await signup(username, email, password);
      } else {
        await login(email, password);
      }
      onClose();
      navigate('/profile');
    } catch (error) {
      console.error(`${formType} error:`, error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          {formType === 'signUp' && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {formType === 'signUp' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p>
          {formType === 'signUp'
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setFormType(formType === 'signUp' ? 'signIn' : 'signUp')}
            className="toggle-button"
          >
            {formType === 'signUp' ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUpModal;
