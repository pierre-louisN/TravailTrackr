// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import SearchBar from './SearchBar';

// describe('<SearchBar />', () => {
//   test('it should mount', () => {
//     render(<SearchBar />);
    
//     const searchBar = screen.getByTestId('SearchBar');

//     expect(searchBar).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  test('it should mount', () => {
    // Define a mock function for onSearch
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchBar = screen.getByTestId('SearchBar');

    expect(searchBar).toBeInTheDocument();
  });
});
