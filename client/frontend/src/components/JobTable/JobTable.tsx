import React, { FC, useState, useEffect } from 'react'; // Import React and necessary hooks
import { JobTableWrapper } from './JobTable.styled'; // Import styled components
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { Job } from './JobModel';

import JobList from './JobList'; // Import the JobList component

export interface JobTableProps {
  jobs: Job[];
  searchTerm: string; // Add searchTerm prop
  // Define props if needed
}

const JobTable: React.FC<JobTableProps> = ({ searchTerm, jobs }) => {
  // State to manage sorting and jobs data
const [sortedJobs, setSortedJobs] = useState<Job[]>([]); // State for sorted jobs

useEffect(() => {
  setSortedJobs(jobs); // Update sortedJobs with the initial jobs array
}, [jobs]); // Run this effect whenever jobs prop changes

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



  // Function to handle form submission
const handleSubmit = async (newJob: Job) => { // Add 'async' keyword here
  // Send new job data to the backend API
  const { id, ...newJobData } = newJob;
  try {
    const response = await axios.post('/api/jobs', newJobData); // Use 'await' here to wait for the response
    if (response.status === 201) {
      console.log('New job added successfully!');
      // Assuming the response includes the newly created job data,
      // you can update the UI by adding the new job to the list of jobs
      const updatedJobs = [...jobs, { ...response.data, id: response.data._id }];
      setSortedJobs(updatedJobs);

      // After adding the job, call the function to generate the CV
      // await generateCVForJob('' as string, newJobData.versionCV as string);
      // Explicitly specify the types of newJobData.companyName and newJobData.versionCV as strings
    } else {
      console.error('Failed to add new job:', response.statusText);
    }
  } catch (error: any) {
    console.error('Error adding new job:', error.message);
  }
};

  // Function to generate CV, could be used in the future, do not delete
const generateCVForJob = async (companyName: string, versionCV: string) => {
  try {
    await axios.post('/api/generate-cv', {
      companyName,
      version: versionCV
    });
    console.log('CV generated successfully!');
  } catch (error: any) {
    console.error('Error generating CV:', error.message);
    throw error;
  }
};

  // Function to handle deletion of a job
  const handleDeleteJob = (id: string) => {
    // Send delete request to the backend API
    axios.delete(`/api/jobs/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('Job deleted successfully!');
          // Update jobs array by filtering out the deleted job
          const updatedJobs = jobs.filter(job => job.id !== id);
          setSortedJobs(updatedJobs);
        } else {
          console.error('Failed to delete job:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting job:', error.message);
      });
  };


return (
  <div className="job-table">
    <SearchBar onSearch={handleSearch} />
    <JobTableWrapper data-testid="JobTable">
      <JobList jobs={sortedJobs} onSubmit={handleSubmit} onDelete={handleDeleteJob} />
      {/* Display total number of jobs */}
      <div className="counter">Total Jobs: {jobs.length}</div>
    </JobTableWrapper>
  </div>
);
};

export default JobTable;
