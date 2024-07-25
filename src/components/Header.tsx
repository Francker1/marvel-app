import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MarvelLogo from '../assets/Marvel-logo.svg';
import HeartIconFilled from '../assets/Heart-icon-filled.svg';

const Header: React.FC = () => {

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img src={MarvelLogo} alt="Marvel Logo" className="logo" />
        </Link>
        <div className="favorites-icon">
          <img src={HeartIconFilled} alt="Favorites" />
          <span className="favorites-count">3</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
