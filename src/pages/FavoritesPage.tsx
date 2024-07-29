import { useState } from 'react';
import Header from '../components/Header';
import './home-style.css';
import CharacterCard from '../components/CharacterCard';
import { useFavorites } from '../context/FavoritesContext';
import SearchIcon from '../assets/Search-icon.svg';

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <main className="main-content">
          <h1>Favorites</h1>
          <div className="search-container">
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search a character"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="results-count">{favorites.length} RESULTS</div>
          <div className="character-list">
            {favorites
              .filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((character) => (
                <CharacterCard
                  character={character}
                  isFavorite={isFavorite(character.id)}
                  key={character.id}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default FavoritesPage;
