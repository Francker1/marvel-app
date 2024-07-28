import { useEffect, useState } from 'react';
import Header from '../components/Header';
import './home-style.css';
import charactersData from '../data/characters.json';
import CharacterCard from '../components/CharacterCard';
//import { type Character } from '../types';
import { useFavorites } from '../context/FavoritesContext';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    // fetch(
    //   'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${apiHash}&limit=50',
    // )
    //   .then(async (res) => await res.json())
    //   .then((res) => {
    //     setCharacters(res.data.results);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    // Simulation API call because Marvel api is too slow
    setCharacters(charactersData.data.results);
    setIsLoading(false);
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
