import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { expect, test, vi } from 'vitest';

test('renders correctly with the given search term', () => {
  const { asFragment } = render(<Search searchTerm="Spi" handleSearchChange={() => {}} />);
  const input = screen.getByPlaceholderText('Search a character');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('Spi');
  expect(asFragment()).toMatchSnapshot(); // Crear snapshot
});

test('calls handleSearchChange on input change', () => {
  const handleSearchChange = vi.fn();
  render(<Search searchTerm="" handleSearchChange={handleSearchChange} />);
  const input = screen.getByPlaceholderText('Search a character');
  fireEvent.change(input, { target: { value: 'Iron Man' } });
  expect(handleSearchChange).toHaveBeenCalledWith(expect.any(Object));
});
