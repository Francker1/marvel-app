import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Hero = styled.div`
  width: 100%;
  background-color: #000;
  

  media (min-width: 768px) {
    height: 320px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  
  media (min-width: 768px) {
    height: 320px;
    padding: 20px;
  }
`;

const CharacterImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  text-align: center;
  
  @media (min-width: 768px) {
    height: 320px;
    flex-direction: row;
    text-align: left;
  }
`;

const CharacterImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
  max-width: none;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
    height: 100%;
    max-width: 200px;
  }
`;

const CharacterInfo = styled.div`
  flex: 1;
`;

const CharacterName = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CharacterDescription = styled.p`
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ComicsSection = styled.div`
  margin-top: 40px;
`;

const ComicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const ComicItem = styled.div`
  flex: 0 0 100%;
  text-align: left;

  @media (min-width: 480px) {
    flex: 0 0 45%;
  }

  @media (min-width: 768px) {
    flex: 0 0 18%;
  }
`;

const ComicImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 12px;
`;

const ComicTitle = styled.h3`
  font-size: 0.875rem;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const ComicYear = styled.p`
  font-size: 0.75rem;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

interface CharacterDetail {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterDetailPage: React.FC = () => {
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [comics, setComics] = useState<any[]>([]);
  const { characterId } = useParams<{ characterId: string }>();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=a14d594f1d265d357ea7a3dede1d58cc&hash=c7b09862a15c17dfaa1e85e796b205fa`);
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    const fetchComics = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=a14d594f1d265d357ea7a3dede1d58cc&hash=c7b09862a15c17dfaa1e85e796b205fa`);
        setComics(response.data.data.results);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    fetchCharacter();
    fetchComics();
  }, [characterId]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Hero>
        <Container>
          <CharacterImageSection>
            <CharacterImage src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <CharacterInfo>
              <CharacterName>{character.name}</CharacterName>
              <CharacterDescription>{character.description}</CharacterDescription>
            </CharacterInfo>
          </CharacterImageSection>
        </Container>
      </Hero>

      <Container>
        <ComicsSection>
          <h2>Comics</h2>
          <ComicList>
            {comics.map((comic) => (
              <ComicItem key={comic.id}>
                <ComicImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicYear>{new Date(comic.dates[0].date).getFullYear()}</ComicYear>
              </ComicItem>
            ))}
          </ComicList>
        </ComicsSection>
      </Container>
    </>
  );
};

export default CharacterDetailPage;
