import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../images/logo.png';

function Header() {
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
        <a href="/">Sign In</a>
        <span> | </span>
        <a href="/">Login</a>
      </div>
    </header>
  );
}
export default Header;