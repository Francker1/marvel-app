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

const CharacterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const CharacterName = styled.h1`
  font-size: 32px;
`;

const CharacterDescription = styled.p`
  font-size: 16px;
`;

const FavoriteIcon = styled.span`

  img {
    width: 24px;
    height: 24px;
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
          <CharacterHeader>
            <CharacterName>{character.name}</CharacterName>
            <FavoriteIcon onClick={handleFavoriteClick}>
              <img
                src={
                  isFavorite(character.id) ? HeartIconFilled : HeartIconEmpty
                }
                alt="Favorite Icon"
              />
            </FavoriteIcon>
          </CharacterHeader>
          <CharacterDescription>{character.description}</CharacterDescription>

        </CharacterInfo>

      </CharacterImageSectionWrapper>
    ) : (
      <div>Error loading character data</div>
    )
  );
};

export default CharacterImageSection;
