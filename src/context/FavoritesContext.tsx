import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CharacterDetail } from '../types';

interface FavoritesContextProps {
  favorites: CharacterDetail[];
  addFavorite: (character: CharacterDetail) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<CharacterDetail[]>([]);

  const addFavorite = (character: CharacterDetail) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };

  const removeFavorite = (characterId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((character) => character.id !== characterId),
    );
  };

  const isFavorite = (characterId: number) => {
    return favorites.some((character) => character.id === characterId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
