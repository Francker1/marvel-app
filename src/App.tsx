import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterDetailPage from './pages/CharacterDetailPage';

function App() {

  const [characters, setCharacters] = useState([]);

  // useEffect(() => {

  //   fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a14d594f1d265d357ea7a3dede1d58cc&hash=c7b09862a15c17dfaa1e85e796b205fa&limit=50')
  //     .then(async res => await res.json())
  //     .then(res => {
  //       setCharacters(res.data.results)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
