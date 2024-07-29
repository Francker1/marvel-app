import React from 'react';
import { CharacterDetail } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import Loader from '../Loader/Loader';
import { CharacterImageSectionWrapper, CharacterImage, CharacterInfo, CharacterHeader, CharacterName, CharacterDescription, FavoriteIcon } from './CharacterImageSection.styles'
import HeartIconFilled from '../../assets/img/Heart-icon-filled.svg';
import HeartIconEmpty from '../../assets/img/Heart-icon-empty.svg';



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
