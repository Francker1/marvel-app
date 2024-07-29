import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import MarvelService from '../services/api';
import Header from '../components/Header';
import { useFavorites } from '../context/FavoritesContext';
import HeartIconFilled from '../assets/Heart-icon-filled.svg';
import HeartIconEmpty from '../assets/Heart-icon-empty.svg';

const Hero = styled.div`
  width: 100%;
  background-color: #000;

  @media (min-width: 768px) {
    height: 320px;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const CharacterImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  position: relative;
  text-align: left;
  
  @media (min-width: 768px) {
    height: 320px;
    flex-direction: row;
    align-items: center;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 398px;
  object-fit: inherit;

  @media (min-width: 768px) {
    width: auto;
    height: 100%;
  }
`;

const CharacterInfo = styled.div`
  width: 100%
  background-color: black;
  color: white;
  padding: 16px 24px;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  @media (min-width: 768px) {
    padding: 48px;
    justify-content: space-between;
  }
`;

const CharacterName = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CharacterDescription = styled.p`
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const FavoriteIcon = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ComicsSection = styled.div`
  margin-top: 40px;
  margin-bottom: 48px;
  padding: 48px;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const ComicList = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  margin-top: 20px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #D9D9D9;
  }

  &::-webkit-scrollbar-thumb{
    background-color: #EC1D24;
  }
`;

const ComicItem = styled.div`
  flex: 0 0 18%;
  text-align: left;
  min-width: 150px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex: 0 0 45%;
  }

  @media (max-width: 480px) {
    flex: 0 0 70%;
  }
`;

const ComicImage = styled.img`
  width: 100%;
  height: 270px;
  margin-bottom: 12px;
`;

const ComicTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const ComicYear = styled.p`
  font-size: 12px;
`;
interface CharacterDetail {
  id: number;
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
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        const characterData = await MarvelService.fetchCharacterById(characterId);
        setCharacter(characterData);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    const loadComicsData = async () => {
      try {
        const comicsData = await MarvelService.fetchComicsByCharacterId(characterId);
        setComics(comicsData);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    loadCharacterData();
    loadComicsData();
  }, [characterId]);


  const handleFavoriteClick = () => {
    if (!character) return;
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <>
      <Header />

      {!character ? (<div>Loading...</div>) : (<><Hero>
        <Container>
          <CharacterImageSection>
            <CharacterImage src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <CharacterInfo>
              <CharacterName>{character.name}</CharacterName>
              <CharacterDescription>{character.description}</CharacterDescription>
              <FavoriteIcon onClick={handleFavoriteClick}>
                <img src={isFavorite(character.id) ? HeartIconFilled : HeartIconEmpty} alt="Favorite Icon" />
              </FavoriteIcon>
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
        </Container></>)}

    </>
  );
};

export default CharacterDetailPage;
