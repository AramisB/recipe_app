import React, { useState, useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import '../styles/authModal.css';

const SignInSignUpModal = ({ isOpen, onClose, initialFormType }) => {
  const [formType, setFormType] = useState(initialFormType);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'signUp') {
      await signup(username, email, password);
    } else {
      await login(email, password);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        {error && <p className="error-message">{error}</p>}
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
          {formType === 'signUp' ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setFormType(formType === 'signUp' ? 'signIn' : 'signUp')}
          >
            {formType === 'signUp' ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUpModal;