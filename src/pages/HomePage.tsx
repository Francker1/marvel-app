import { useEffect, useState } from 'react';
import Header from '../components/Header';
import "./home-style.css";
import charactersData from '../data/characters.json';
import CharacterCard from '../components/CharacterCard';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // fetch(
    //   'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a14d594f1d265d357ea7a3dede1d58cc&hash=c7b09862a15c17dfaa1e85e796b205fa&limit=50',
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
    // Simula la llamada a la API usando el archivo JSON
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
                <CharacterCard character={character} isFavorite={false} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
