import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import MarvelService from '../services/api';
import Header from '../components/Header/Header';
import { useFavorites } from '../context/FavoritesContext';
import CharacterImageSection from '../components/CharacterImageSection/CharacterImageSection';
import ComicsSection from '../components/ComicsSection/ComicsSection';
import { CharacterDetail, Comics } from '../types';

const Hero = styled.div`
  width: 100%;
  background-color: #000000;
  position: relative;

  @media (min-width: 768px) {
    height: 320px;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 24px solid transparent;
    border-bottom: 24px solid #FFFFFF;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const CharacterDetailPage: React.FC = () => {

  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [comics, setComics] = useState<Comics[]>([]);
  const { characterId } = useParams<{ characterId: string }>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  useEffect(() => {
    const loadCharacterData = async () => {
      setIsLoadingCharacter(true);
      try {
        const characterData = await MarvelService.fetchCharacterById(characterId);
        setCharacter(characterData);
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setIsLoadingCharacter(false);
      }
    };

    const loadComicsData = async () => {
      setIsLoadingComics(true);
      try {
        const comicsData = await MarvelService.fetchComicsByCharacterId(characterId);
        setComics(comicsData);
      } catch (error) {
        console.error('Error fetching comics:', error);
      } finally {
        setIsLoadingComics(false);
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
      <Hero>
        <Container>
          <CharacterImageSection character={character} handleFavoriteClick={handleFavoriteClick} isLoading={isLoadingCharacter} />
        </Container>
      </Hero>
      <Container>
        <ComicsSection comics={comics} isLoading={isLoadingComics} />
      </Container>
    </>
  );
};

export default CharacterDetailPage;
