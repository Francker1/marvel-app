import React from 'react';
import styled from 'styled-components';
import Loader from './Loader/Loader';

const ComicsSectionWrapper = styled.div`
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
    background: #d9d9d9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ec1d24;
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

interface ComicsSectionProps {
  comics: any[];
  isLoading: boolean;
}

const ComicsSection: React.FC<ComicsSectionProps> = ({ comics, isLoading }) => {
  return (
    <ComicsSectionWrapper>
      <h2>Comics</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ComicList>
          {comics.map((comic) => (
            <ComicItem key={comic.id}>
              <ComicImage
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <ComicTitle>{comic.title}</ComicTitle>
              <ComicYear>
                {new Date(comic.dates[0].date).getFullYear()}
              </ComicYear>
            </ComicItem>
          ))}
        </ComicList>
      )}
    </ComicsSectionWrapper>
  );
};

export default ComicsSection;
