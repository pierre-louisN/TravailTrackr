import React from 'react';
import { Job } from './JobModel';
import { useParams, Link } from 'react-router-dom';

interface JobDetailsProps {
  jobs: Job[];
}

const JobDetailsPage: React.FC<JobDetailsProps> = ({ jobs }) => {
  const { id } = useParams(); // Access the id parameter from the URL

  // Retrieve the job with the matching id
  const selectedJob = jobs.find((job) => job.id === id);

  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h2>{selectedJob.emploi}</h2>
      <p>{selectedJob.lien}</p>
      {/* Display more job details here */}
      \<Link to="/">Back to Job List</Link>
    </div>
  );
};

export default JobDetailsPage;
