import React from 'react';
import { Job } from './JobModel';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom



interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onDelete }) => {

  const openCVLink = (cvVersion: string) => {
    // Define the links for each CV version
    const cvLinks: { [key: string]: string } = {
      'Version 1': 'https://fr.overleaf.com/project/65b03dd68a8bbd5e0ae74eec',
      'Version 2': 'https://fr.overleaf.com/project/65b0443c72e325a8ec0d7b8a', // Replace with your link for Version 2
      // Add more CV versions and their links as needed
    };

    // Open the link for the selected CV version in a new tab
    if (cvLinks[cvVersion]) {
      window.open(cvLinks[cvVersion], '_blank');
    }
  };
  
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
      <td onClick={() => openCVLink(job.versionCV)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
        {job.versionCV}
      </td>
      <td>{job.status}</td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
};

export default JobItem;
