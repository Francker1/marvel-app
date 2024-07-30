import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import './Header.css';
import MarvelLogo from '../../assets/img/Marvel-logo.svg';
import HeartIconFilled from '../../assets/img/Heart-icon-filled.svg';

const Header: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img src={MarvelLogo} alt="Marvel Logo" className="logo" />
        </Link>
        <div className="favorites-icon">
          <Link to="/favorites">
            <img src={HeartIconFilled} alt="Favorites" />
            <span className="favorites-count">{favorites.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
