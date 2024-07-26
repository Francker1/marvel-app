import { useEffect, useState } from 'react';
import Header from '../components/Header';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(
      'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a14d594f1d265d357ea7a3dede1d58cc&hash=c7b09862a15c17dfaa1e85e796b205fa&limit=50',
    )
      .then(async (res) => await res.json())
      .then((res) => {
        setCharacters(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header />
      <h1>Home Characters List</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {characters.map((character) => (
            <div key={character.id}>
              <p>Name: {character.name}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default HomePage;
