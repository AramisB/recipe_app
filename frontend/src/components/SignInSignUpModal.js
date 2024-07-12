import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authModal.css';
import { AuthContext } from '../pages/AuthContext';

function SignInSignUpModal({ isOpen, onClose, initialFormType }) {
  const { signIn, signUp } = useContext(AuthContext);
  const [formType, setFormType] = useState(initialFormType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Add this for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'signIn') {
      try {
        await signIn(email, password);
        onClose();
        navigate('/profile');  // Redirect to Profile page after successful sign-in
      } catch (error) {
        setError('Invalid email or password');
      }
    } else {
      try {
        await signUp(email, password);
        onClose();
        navigate('/profile');  // Redirect to Profile page after successful sign-up
      } catch (error) {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
    isOpen && (
      <div className="auth-modal">
        <div className="modal-content">
          <button className="close" onClick={onClose}>×</button>
          <form className="auth-form" onSubmit={handleSubmit}>
            <h3>{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</h3>
            {error && <div className="error-message">{error}</div>}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{formType === 'signIn' ? 'Sign In' : 'Sign Up'}</button>
            <p>
              {formType === 'signIn' ? 'Don\'t have an account? ' : 'Already have an account? '}
              <button type="button" onClick={() => setFormType(formType === 'signIn' ? 'signUp' : 'signIn')}>
                {formType === 'signIn' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </div>
      </div>
    )
  );
}

export default SignInSignUpModal;
