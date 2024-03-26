// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import JobTable from './JobTable';

// describe('<JobTable />', () => {
//   test('it should mount', () => {
//     render(<JobTable />);
    
//     const jobTable = screen.getByTestId('JobTable');

//     expect(jobTable).toBeInTheDocument();
//   });
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import JobTable from './JobTable';

describe('<JobTable />', () => {
  test('it should mount', () => {
    // Define a mock jobs array
    const mockJobs = [
      { id: '1', emploi: 'Developer', lien : 'https://www.linkedin.com/mynetwork/', date: '2022-02-01', ville: 'City', site: 'Site', versionCV: '1.0', status: 'Active' },
      // Add more job objects as needed
    ];

    render(<JobTable jobs={mockJobs} searchTerm="" />);
    
    const jobTable = screen.getByTestId('JobTable');

    expect(jobTable).toBeInTheDocument();
  });
});
