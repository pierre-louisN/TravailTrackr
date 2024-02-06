// JobTableLazy.tsx

import React, { lazy, Suspense } from 'react';
import { JobTableProps } from './JobTable'; // Import JobTableProps
const LazyJobTable = lazy(() => import('./JobTable'));

// Destructure the props and pick the properties you need
const JobTable = ({ jobs, ...restProps }: JobTableProps) => (
  <Suspense fallback={null}>
    {/* Pass the jobs prop explicitly */}
    <LazyJobTable jobs={jobs} {...restProps} />
  </Suspense>
);

export default JobTable;
