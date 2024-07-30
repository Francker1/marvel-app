import { useState } from 'react';
import {
  Card,
  CharacterLink,
  CharacterImage,
  CharacterInfo,
  CharacterName,
  FavoritesIcon,
} from './CharacterCard.styles';
import HeartIconFilled from '../../assets/img/Heart-icon-filled.svg';
import HeartIconFilledWhite from '../../assets/img/Heart-icon-white.svg';
import HeartIconEmpty from '../../assets/img/Heart-icon-empty.svg';

interface CharacterCardProps {
  character: any;
  isFavorite: boolean;
  addFavorite: (character: any) => void;
  removeFavorite: (characterId: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isFavorite,
  addFavorite,
  removeFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CharacterLink to={`/character/${character.id}`}>
        <CharacterImage
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </CharacterLink>
      <CharacterInfo>
        <CharacterName>{character.name}</CharacterName>
        <FavoritesIcon isHovered={isHovered} onClick={handleFavoriteClick}>
          <img
            src={
              isFavorite
                ? isHovered
                  ? HeartIconFilledWhite
                  : HeartIconFilled
                : HeartIconEmpty
            }
            alt="Add to Favorites"
          />
        </FavoritesIcon>
      </CharacterInfo>
    </Card>
  );
};

export default CharacterCard;
