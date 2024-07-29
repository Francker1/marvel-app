import React from 'react';
import styled from 'styled-components';
import HeartIconFilled from '../assets/Heart-icon-filled.svg';
import HeartIconEmpty from '../assets/Heart-icon-empty.svg';
import { CharacterDetail } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import Loader from './Loader/Loader';

const CharacterImageSectionWrapper = styled.div`
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
  width: 100%;
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

interface CharacterImageSectionProps {
  character: CharacterDetail | null;
  handleFavoriteClick: () => void;
  isLoading: boolean;
}

const CharacterImageSection: React.FC<CharacterImageSectionProps> = ({
  character,
  handleFavoriteClick,
  isLoading,
}) => {
  const { isFavorite } = useFavorites();

  return (
    isLoading ? (
      <Loader />
    ) : character ? (

      <CharacterImageSectionWrapper>
        <CharacterImage
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <CharacterInfo>
          <CharacterName>{character.name}</CharacterName>
          <CharacterDescription>{character.description}</CharacterDescription>
          <FavoriteIcon onClick={handleFavoriteClick}>
            <img
              src={
                isFavorite(character.id) ? HeartIconFilled : HeartIconEmpty
              }
              alt="Favorite Icon"
            />
          </FavoriteIcon>
        </CharacterInfo>

      </CharacterImageSectionWrapper>
    ) : (
      <div>Error loading character data</div>
    )
  );
};

export default CharacterImageSection;
