import styled from 'styled-components';

export const CharacterImageSectionWrapper = styled.div`
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

export const CharacterImage = styled.img`
  width: 100%;
  height: 398px;
  object-fit: inherit;

  @media (min-width: 768px) {
    width: auto;
    height: 100%;
  }
`;

export const CharacterInfo = styled.div`
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

export const CharacterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const CharacterName = styled.h1`
  font-size: 32px;
`;

export const CharacterDescription = styled.p`
  font-size: 16px;
`;

export const FavoriteIcon = styled.span`
  img {
    width: 24px;
    height: 24px;
  }
`;
