import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import {
  FavoritesProvider,
  useFavorites,
} from '../../context/FavoritesContext';
import { CharacterDetail } from '../../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  const character: CharacterDetail = {
    id: 1,
    name: 'Spider-Man',
    description: 'Friendly neighborhood Spider-Man',
    thumbnail: { path: 'http://example.com/spider-man', extension: 'jpg' },
  };

  it('adds a favorite character', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(character);
    });

    expect(result.current.favorites).toContainEqual(character);
  });

  it('removes a favorite character', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(character);
      result.current.removeFavorite(character.id);
    });

    expect(result.current.favorites).not.toContainEqual(character);
  });

  it('checks if a character is a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(character);
    });

    expect(result.current.isFavorite(character.id)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(false);
  });
});
