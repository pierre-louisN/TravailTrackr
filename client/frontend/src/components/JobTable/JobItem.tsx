import React from 'react';
import { Job } from './JobModel';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import { updateJobStatus, downloadCV  } from '../../api/jobApi';


interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
}


const JobItem: React.FC<JobItemProps> = ({ job, onDelete }) => {

  // const [selectedStatus, setSelectedStatus] = useState(job.status); // State to manage selected status
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(null);

  const statusOptions = [
    { value: 'Postulé', label: 'Postulé' },
    { value: 'En cours d\'examen', label: 'En cours d\'examen' },
    { value: 'Entretien planifié', label: 'Entretien planifié' },
    { value: 'Entretien réalisé', label: 'Entretien réalisé' },
    { value: 'Offre étendue', label: 'Offre étendue' },
    { value: 'Offre acceptée', label: 'Offre acceptée' },
    { value: 'Offre refusée', label: 'Offre refusée' },
    { value: 'KO', label: 'KO' },
    // Add more status options as needed
  ];
  
  useEffect(() => {
    // Set the default value for selectedStatus when the job prop changes
    setSelectedStatus({ value: job.status, label: job.status });
  }, [job]);
  

  // const handleStatusChange = async (selectedOption: any, actionMeta: any) => {
  //   if (actionMeta.action === 'select-option') {
  //     setSelectedStatus(selectedOption);
  //     try {
  //       await axios.put(`/api/jobs/${job.id}`, { status: selectedOption.value });
  //     } catch (error) {
  //       console.error('Error updating status:', error);
  //     }
  //   }
  // };
  
  const handleStatusChange = async (selectedOption: any, actionMeta: any) => {
    if (actionMeta.action === 'select-option') {
      setSelectedStatus(selectedOption);
      try {
        await updateJobStatus(job.id, selectedOption.value);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  // const downloadCV = async (cvVersion: string) => {
  //   try {
  //     // Make a GET request to the backend route to download the CV
  //     const response = await axios.get(`/api/download-cv/${cvVersion}`, {
  //       responseType: 'blob', // Set the response type to blob to handle binary data (PDF file)
  //     });


  //   // Extract the filename from the Content-Disposition header

  //   const contentDisposition = response.headers['content-disposition'];
  //   const match = contentDisposition.match(/filename=(.+)/);
  //   const filename = match && match[1];

  //     // Create a URL object from the blob data
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  
  //     // Create an anchor element to trigger the download
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', filename); // Set the filename for the downloaded file
  //     document.body.appendChild(link);
  
  //     // Click the anchor element to start the download
  //     link.click();
  
  //     // Clean up by removing the anchor element and revoking the URL object
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading CV:', error);
  //     // Handle the error
  //   }
  // };

  const getCV = async (cvVersion: string) => {
    try {
      await downloadCV(cvVersion);
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Handle the error
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

  const formatVersion = (version: string) => {
    // Extract the number from the version string using a regular expression
    const versionNumber = version.match(/\d+/);
  
    // If a number is found, prepend "Version " to it, otherwise return the original version
    return versionNumber ? `Version ${versionNumber[0]}` : version;
  };
  
  

      
  return (
    <tr  onClick={handleRowClick}>
      <td><Link to={`/job/${job.id}`}>{job.emploi}</Link></td>
      <td><button onClick={() => handleClick(job.lien)}>View Job</button></td>
      <td>{formattedDate}</td>
      <td>{job.ville}</td>
      <td>{job.site}</td>
      <td onClick={() => getCV(job.versionCV)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
        {formatVersion(job.versionCV)}
      </td>
      {/* <td>{job.status}</td>
       */}
      <td>
        {/* Searchable dropdown for selecting status */}
        <Select 
          value={selectedStatus}
          onChange={handleStatusChange}
          options={statusOptions} // Wrap statusOptions in an array
          isSearchable
          placeholder="Sélectionnez le statut"
        />
      </td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
};

export default JobItem;
