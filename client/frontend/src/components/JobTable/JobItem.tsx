import React from 'react';
import { Job } from './JobModel';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom



interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onDelete }) => {

  const navigate = useNavigate();
  
  const formattedDate = new Date(job.date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/');

  const handleClick = (lien: string) => {
    // Open the link in a new tab when the button is clicked
    window.open(lien, '_blank');
  };

  const handleDeleteClick = () => {
    console.log('job to be deleted :'+ job.id);
    if (job.id) {
      onDelete(job.id);
    } else {
      console.error('Job ID is undefined');
    }
  };

  const handleRowClick = () => {
    // Redirect to the job details page when the row is clicked
    // You can use the Link component with the job ID as a URL parameter
    // Example: `/job/${job.id}`
    console.log('row clicked')
    // navigate(`/job/${job.id}`); // Navigate to the job details page)
  };

      
  return (
    <tr  onClick={handleRowClick}>
      <td><Link to={`/job/${job.id}`}>{job.emploi}</Link></td>
      <td><button onClick={() => handleClick(job.lien)}>View Job</button></td>
      <td>{formattedDate}</td>
      <td>{job.ville}</td>
      <td>{job.site}</td>
      <td>{job.versionCV}</td>
      <td>{job.status}</td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
};

export default JobItem;
