import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { useFavorites } from '../context/FavoritesContext';
import MarvelService from '../services/api';
import { Character } from '../types';
import Loader from '../components/Loader/Loader';
import SearchIcon from '../assets/img/Search-icon.svg';
import '../global.css';


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadCharacters(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const loadCharacters = async (nameStartsWith = '') => {
    setIsLoading(true);
    try {
      const characters = await MarvelService.fetchCharacters(nameStartsWith);
      setCharacters(characters);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <main className="main-content">
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

          <div className="results-count">{characters.length} RESULTS</div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="character-list">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isFavorite={isFavorite(character.id)}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
