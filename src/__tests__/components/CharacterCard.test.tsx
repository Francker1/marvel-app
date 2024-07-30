import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

const mockCharacter = {
  id: 1,
  name: 'Spider-Man',
  description: 'Friendly neighborhood Spider-Man',
  thumbnail: {
    path: 'http://example.com/spider-man',
    extension: 'jpg',
  },
};

test('renders character card correctly', () => {
  const { asFragment } = render(
    <Router>
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        addFavorite={() => {}}
        removeFavorite={() => {}}
      />
    </Router>
  );
  expect(screen.getByText('Spider-Man')).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot(); // Crear snapshot
});

test('calls addFavorite on heart icon click when not favorite', () => {
  const addFavorite = vi.fn();
  render(
    <Router>
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        addFavorite={addFavorite}
        removeFavorite={() => {}}
      />
    </Router>
  );
  const heartIcon = screen.getByAltText('Add to Favorites');
  fireEvent.click(heartIcon);
  expect(addFavorite).toHaveBeenCalledWith(mockCharacter);
});

test('calls removeFavorite on heart icon click when favorite', () => {
  const removeFavorite = vi.fn();
  render(
    <Router>
      <CharacterCard
        character={mockCharacter}
        isFavorite={true}
        addFavorite={() => {}}
        removeFavorite={removeFavorite}
      />
    </Router>
  );
  const heartIcon = screen.getByAltText('Add to Favorites');
  fireEvent.click(heartIcon);
  expect(removeFavorite).toHaveBeenCalledWith(mockCharacter.id);
});
