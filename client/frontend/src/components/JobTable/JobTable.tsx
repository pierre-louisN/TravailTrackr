import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { JobTableWrapper } from './JobTable.styled'; // Import styled components
import SearchBar from '../SearchBar/SearchBar';
import { Job } from './JobModel';
import { addNewJob, deleteJob  } from '../../api/jobApi';
import JobList from './JobList'; // Import the JobList component

export interface JobTableProps {
  jobs: Job[];
  searchTerm: string; // Add searchTerm prop
  // Define props if needed
}

const JobTable: React.FC<JobTableProps> = ({ searchTerm, jobs }) => {
  // State to manage sorting and jobs data
const [sortedJobs, setSortedJobs] = useState<Job[]>([]); // State for sorted jobs

// Inside your JobTable component
const [jobsAddedLast24Hours, setJobsAddedLast24Hours] = useState(0);

useEffect(() => {
  const currentDate = new Date();
  const twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  const jobsAddedInLast24Hours = jobs.filter(job => new Date(job.date) > twentyFourHoursAgo);
  setJobsAddedLast24Hours(jobsAddedInLast24Hours.length);
}, [jobs]);

useEffect(() => {
  // Sort jobs by date 
  // const sortedJobs = [...jobs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    // Sort jobs by date and second
    const sortedJobs = [...jobs].sort((a, b) => {
      if (new Date(a.date).getTime() !== new Date(b.date).getTime()) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      // if day iis the same compare the seconds 
      return new Date(b.date).getSeconds() - new Date(a.date).getSeconds();
    });

  setSortedJobs(sortedJobs);
  // setSortedJobs(jobs); // Update sortedJobs with the initial jobs array
}, [jobs]); // Run this effect whenever jobs prop changes


  // // Function to handle search by emploi
  // const handleSearch = (searchTerm: string) => {
  //   const filteredJobs = jobs.filter((job) => job.emploi.toLowerCase().includes(searchTerm.toLowerCase()));
  //   setSortedJobs(filteredJobs);
  // };

  const handleSearch = (searchTerm: string) => {
    const filteredJobs = jobs.filter((job) =>
      job.emploi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.lien?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedJobs(filteredJobs);
  };
//   // Function to handle form submission
// const handleSubmit = async (newJob: Job) => { // Add 'async' keyword here
//   // Send new job data to the backend API
//   const { id, ...newJobData } = newJob;
//   try {
//     const response = await axios.post('/api/jobs', newJobData); // Use 'await' here to wait for the response
//     if (response.status === 201) {
//       console.log('New job added successfully!');
//       // Assuming the response includes the newly created job data,
//       // you can update the UI by adding the new job to the list of jobs
//       const updatedJobs = [...jobs, { ...response.data, id: response.data._id }];
//       setSortedJobs(updatedJobs);

//       // After adding the job, call the function to generate the CV
//       // await generateCVForJob('' as string, newJobData.versionCV as string);
//       // Explicitly specify the types of newJobData.companyName and newJobData.versionCV as strings
//     } else {
//       console.error('Failed to add new job:', response.statusText);
//     }
//   } catch (error: any) {
//     console.error('Error adding new job:', error.message);
//   }
// };

// Function to handle form submission
const handleSubmit = async (newJob: Job) => {
  const { id, ...newJobData } = newJob;
  try {
    const response = await addNewJob(newJobData);
    if (response) {
      console.log('New job added successfully!');
      const updatedJobs = [...jobs, { ...response, id: response._id }];
      setSortedJobs(updatedJobs);
      // Call other functions as needed
    } else {
      console.error('Failed to add new job');
    }
  } catch (error: any) {
    console.error('Error adding new job:', error.message);
  }
};


  // // Function to handle deletion of a job
  // const handleDeleteJob = (id: string) => {
  //   // Send delete request to the backend API
  //   axios.delete(`/api/jobs/${id}`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log('Job deleted successfully!');
  //         // Update jobs array by filtering out the deleted job
  //         const updatedJobs = jobs.filter(job => job.id !== id);
  //         setSortedJobs(updatedJobs);
  //       } else {
  //         console.error('Failed to delete job:', response.statusText);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error deleting job:', error.message);
  //     });
  // };

  // Function to handle deletion of a job
const handleDeleteJob = async (id: string) => {
  try {
    const success = await deleteJob(id);
    if (success) {
      console.log('Job deleted successfully!');
      // Update jobs array by filtering out the deleted job
      const updatedJobs = jobs.filter(job => job.id !== id);
      setSortedJobs(updatedJobs);
    } else {
      console.error('Failed to delete job');
    }
  } catch (error:any) {
    console.error('Error deleting job:', error.message);
  }
};


return (
  <div className="job-table">
    <SearchBar onSearch={handleSearch} />
    <JobTableWrapper data-testid="JobTable">
      <JobList jobs={sortedJobs} onSubmit={handleSubmit} onDelete={handleDeleteJob} />
      {/* Display total number of jobs */}
      <div className="counter">Total Jobs: {jobs.length}</div>
      
      {/* Display number of jobs added in the last 24 hours */}
      <div className="counter">Jobs Added in Last 24 Hours: {jobsAddedLast24Hours}</div>
    </JobTableWrapper>
  </div>
);
};

export default JobTable;
