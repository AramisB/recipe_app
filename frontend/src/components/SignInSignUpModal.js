import React, { useState } from 'react';
import '../styles/authModal.css';

const SignInSignUpModal = ({ isOpen, onClose, initialFormType }) => {
  const [formType, setFormType] = useState(initialFormType);

  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        {formType === 'signIn' ? (
          <form className="auth-form">
            <h3>Sign In</h3>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
            <button type="submit">Sign In</button>
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={() => setFormType('signUp')}>
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form className="auth-form">
            <h3>Sign Up</h3>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
            <button type="submit">Sign Up</button>
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setFormType('signIn')}>
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInSignUpModal;
