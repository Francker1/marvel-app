import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeartIconFilled from '../assets/Heart-icon-filled.svg';
import HeartIconFilledWhite from '../assets/Heart-icon-white.svg';
import HeartIconEmpty from '../assets/Heart-icon-empty.svg';

interface CharacterCardProps {
  character: any;
  isFavorite: boolean;
  addFavorite: (character: any) => void;
  removeFavorite: (characterId: number) => void;
}

const Card = styled.div`
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  position: relative;
`;

const CharacterLink = styled(Link)`
  display: block;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 7px;
    background-color: red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 190px;
`;

const CharacterInfo = styled.div`
  height: 56px;
  background: linear-gradient(to bottom, red 0%, red 0%, transparent 0%);
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  transition: background 0.3s ease;

  ${Card}:hover & {
    background: linear-gradient(to bottom, red 0%, red 100%);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-bottom: 12px solid white;
  }
`;

const CharacterName = styled.span`
  font-size: 14px;
  flex: 1;
  text-align: left;
  text-transform: uppercase;
`;

const FavoritesIcon = styled.span<{ isHovered: boolean }>`
  cursor: pointer;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Card}:hover & {
    color: white;
  }

  img {
    width: 14px;
    height: 14px;
  }
`;

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isFavorite, addFavorite, removeFavorite }) => {
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
        <CharacterImage src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
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
