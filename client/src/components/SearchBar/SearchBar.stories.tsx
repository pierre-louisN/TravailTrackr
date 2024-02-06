/* eslint-disable */
import React from 'react';
import SearchBar from './SearchBar';

export default {
  title: "SearchBar",
  component: SearchBar,
};

export const Default = () => {
  // Define a mock onSearch function (replace with your actual search logic)
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  };

  return <SearchBar onSearch={handleSearch} />;
};

Default.story = {
  name: 'default',
};
