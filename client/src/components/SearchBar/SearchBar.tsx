// SearchBar.tsx
import React, { useState } from 'react';
import { SearchBarWrapper } from './SearchBar.styled';

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Pass a callback to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle input change and trigger search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call the onSearch callback with the current search term
  };

  return (
    <SearchBarWrapper data-testid="SearchBar">
      {/* Render your search input */}
      <input
        type="text"
        placeholder="Search by Emploi..."
        value={searchTerm}
        onChange={handleChange}
      />
    </SearchBarWrapper>
  );
};

export default SearchBar;
