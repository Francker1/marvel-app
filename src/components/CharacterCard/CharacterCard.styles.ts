import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #ffffff;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  position: relative;
`;

export const CharacterLink = styled(Link)`
  display: block;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 7px;
    background-color: #ec1d24;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const CharacterImage = styled.img`
  width: 100%;
  height: 190px;
`;

export const CharacterInfo = styled.div`
  height: 56px;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  transition: background 0.3s ease;

  ${Card}:hover & {
    background: #ec1d24;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-bottom: 12px solid #ffffff;
  }
`;

export const CharacterName = styled.span`
  font-size: 14px;
  flex: 1;
  text-align: left;
  text-transform: uppercase;
`;

export const FavoritesIcon = styled.span.attrs<{ isHovered: boolean }>((props) => ({
  isHovered: undefined,
}))<{ isHovered: boolean }>`
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
