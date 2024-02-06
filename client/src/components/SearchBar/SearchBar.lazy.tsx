import React, { lazy, Suspense } from 'react';
import { SearchBarProps } from './SearchBar'; // Import SearchBarProps
const LazySearchBar = lazy(() => import('./SearchBar'));

// Destructure the props and pick the properties you need
const SearchBar = ({ onSearch, ...restProps }: SearchBarProps) => (
  <Suspense fallback={null}>
    {/* Pass the onSearch prop explicitly */}
    <LazySearchBar onSearch={onSearch} {...restProps} />
  </Suspense>
);

export default SearchBar;
