import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../images/logo.png';
import { AuthContext } from '../pages/AuthContext';

function Header({ openSignInModal, openSignUpModal }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="header__auth">
        {user ? (
          <>
            <Link to="/profile" className="auth-link">Profile</Link>
            <span> | </span>
            <button onClick={logout} className="auth-link">Logout</button>
          </>
        ) : (
          <>
            <button onClick={openSignInModal} className="auth-link">Sign In</button>
            <span> | </span>
            <button onClick={openSignUpModal} className="auth-link">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
