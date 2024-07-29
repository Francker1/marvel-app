import React from 'react';
import Loader from '../Loader/Loader';
import { ComicsSectionWrapper, ComicList, ComicItem, ComicImage, ComicTitle, ComicYear } from './ComicsSection.styles';

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
          {comics.map((comic) => {
            const year = new Date(comic.dates[0].date).getFullYear();
            return (
              <ComicItem key={comic.id}>
                <ComicImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicYear>{isNaN(year) ? 'Unknown' : year}</ComicYear>
              </ComicItem>
            );
          })}
        </ComicList>
      )}
    </ComicsSectionWrapper>
  );
};

export default ComicsSection;
