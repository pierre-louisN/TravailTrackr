// SearchButton.tsx
import React from 'react';

// define props so React knows the types
interface SearchButtonProps {
  link: string;
  buttonText: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ link, buttonText }) => {
  const handleSearch = () => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <button onClick={handleSearch}>{buttonText}</button>
    </div>
  );
};

export default SearchButton;
    