import React from 'react';
import SearchIcon from '../../assets/img/Search-icon.svg';
import './Search.css';

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="search-container">
      <img src={SearchIcon} alt="Search Icon" className="search-icon" />
      <input
        type="text"
        placeholder="Search a character"
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
