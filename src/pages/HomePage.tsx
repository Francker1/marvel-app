import { useEffect, useState } from 'react';
import Header from '../components/Header';
import './home-style.css';
import CharacterCard from '../components/CharacterCard';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
import { Character } from '../types';

const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
const apiHash = import.meta.env.VITE_MARVEL_API_HASH;
const apiBaseUrl = 'https://gateway.marvel.com/v1/public/characters';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCharacters(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchCharacters = async (nameStartsWith = '') => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiBaseUrl, {
        params: {
          apikey: apiKey,
          ts: 1,
          hash: apiHash,
          limit: 25,
          nameStartsWith: nameStartsWith || undefined,
        },
      });
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
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
          <input
            type="text"
            placeholder="Search a character..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="results-count">{characters.length} RESULTS</div>
          {isLoading ? (
            <p>Cargando...</p>
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
