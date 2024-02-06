// // This file defines the JobTable component, 
// which is a functional component.
// // It receives a prop jobs, an array of job objects, 
// and uses it to initialize the state.
// // It contains functions (handleSortByDate and handleSearch) 
// to handle sorting and searching based on the 'date' and 'emploi' properties, respectively.
// // The component renders an input for searching by 'emploi', 
// a button for sorting by 'date', and a table displaying job details.

import React, { FC, useState } from 'react';
import { JobTableWrapper } from './JobTable.styled';

// interface JobTableProps {}

// const JobTable: FC<JobTableProps> = () => (
//  <JobTableWrapper data-testid="JobTable">
//     JobTable Component
//  </JobTableWrapper>
// );

// export default JobTable;


// JobTable.tsx

// Define the type for each job object
interface Job {
  id: number;
  emploi: string;
  date: string;
  ville: string;
  site: string;
  versionCV: string;
  status: string;
}

export interface JobTableProps {
  jobs: Job[]; // Pass the jobs array as a prop
}

const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  // State to manage sorting and jobs data
  const [sortedJobs, setSortedJobs] = useState<Job[]>(jobs);

  // Function to handle sorting by date
  const handleSortByDate = () => {
    const sortedByDate = [...sortedJobs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setSortedJobs(sortedByDate);
  };

  // Function to handle search by emploi
  const handleSearch = (searchTerm: string) => {
    const filteredJobs = jobs.filter((job) => job.emploi.toLowerCase().includes(searchTerm.toLowerCase()));
    setSortedJobs(filteredJobs);
  };

  return (
    <div className="job-table">
      {/* Render your search input */}
      <input
        type="text"
        placeholder="Search by Emploi..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Button to trigger sorting by date */}
      <button onClick={handleSortByDate}>Sort by Date</button>

      {/* Render the table with jobs data */}
      <JobTableWrapper data-testid="JobTable">
      <table>
        <thead>
          <tr>
            <th>Emploi</th>
            <th>Date</th>
            <th>Ville</th>
            <th>Site</th>
            <th>Version CV</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through sortedJobs and render rows */}
          {sortedJobs.map((job) => (
            <tr key={job.id}>
              {/* Render job details */}
              <td>{job.emploi}</td>
              <td>{job.date}</td>
              <td>{job.ville}</td>
              <td>{job.site}</td>
              <td>{job.versionCV}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="counter">Total Jobs: {jobs.length}</div>
      </JobTableWrapper>
    </div>
  );
};

export default JobTable;


