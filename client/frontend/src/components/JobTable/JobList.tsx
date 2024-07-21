import React, { useState, ChangeEvent } from 'react'; // Import React and necessary hooks
import JobItem from './JobItem';
import { Job } from './JobModel';
import Select from 'react-select'; // Import react-select


interface JobListProps {
  jobs: Job[];
  onSubmit: (newJob: Job) => void;
  onDelete: (id: string) => void; // Define onDelete prop
}

const JobList: React.FC<JobListProps> = ({ jobs, onSubmit, onDelete }) => {

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [isEditingDate, setIsEditingDate] = useState(false); // State to track if date is being edited
  const initialDate = new Date().toISOString().slice(0, 10); // Get today's date in the required format
  const [formData, setFormData] = useState<Partial<Job>>({
    date: initialDate,
    versionCV: 'Developer', // Set default value for versionCV
    status: 'Postulé(e)', // Default status value
  });
  const [inputValue, setInputValue] = useState('');

  const statusOptions = [
    { value: 'Postulé(e)', label: 'Postulé(e)' },
    { value: 'En cours d\'examen', label: 'En cours d\'examen' },
    { value: 'Entretien planifié', label: 'Entretien planifié' },
    { value: 'Entretien réalisé', label: 'Entretien réalisé' },
    { value: 'Offre étendue', label: 'Offre étendue' },
    { value: 'Offre acceptée', label: 'Offre acceptée' },
    { value: 'Offre refusée', label: 'Offre refusée' },
    { value: 'KO', label: 'KO' },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'date') {
      if (e.target) { 
        setInputValue(e.target.value);
        console.log(e.target.value)
      }
      console.log(value)
      setCurrentDate(value); // Update the current date directly
      setFormData({ ...formData, [name]: value }); // Update other fields in the form data
    }else if (name === 'lien') {
      // Update the lien field with the entered value
      setFormData(prevData => ({ ...prevData, lien: value }));
      
      try {
        // Extract the domain from the URL
        const url = new URL(value);
        const site = url.hostname;
  
        // Update the site field with the extracted domain
        setFormData(prevData => ({ ...prevData, site }));
      } catch (error) {
        // Handle invalid URLs
        console.error('Invalid URL:', value);
      } 
    } else {
      setFormData({ ...formData, [name]: value }); // Update other fields in the form data
    }
  };
  
  const handleDateClick = () => {
    setIsEditingDate(true);
  };

  const handleDateBlur = () => {
    setIsEditingDate(false);
  };

  const handleSubmit = () => {
    const newJob: Job = {
      emploi: formData.emploi || '',
      lien: formData.lien || '',
      date: formData.date || '',
      ville: formData.ville || '',
      site: formData.site || '',
      versionCV: formData.versionCV || '',
      status: formData.status || '',
      notes: [],
    };
    console.log(newJob);
    onSubmit(newJob);
    // setFormData({});
    handleDateBlur();
    setFormData({ 
      date: initialDate,
      versionCV: 'version1', // Set default value for versionCV
      status: 'Envoye' // Set default value for status
    }); // Reset the defautl values   
  };

  return (
    <table>
      <thead>
        <tr>
        <th>Emploi</th>
        <th>Lien</th>
        <th>Date</th>
        <th>Ville</th>
        <th>Site</th>
        <th>Version CV</th>
        <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Form for adding a new job */}
        <tr>
          {/* <td><input type="text" name="emploi" placeholder="Emploi" value={formData.emploi || ''} onChange={handleInputChange} required /></td> */}
          <td>
            <select name="emploi" value={formData.emploi} onChange={handleInputChange}>
              <option value="">Select Type</option>
              <option value="Message Linkedin">Message Linkedin</option>
              <option value="">Other</option>
            </select>
            {formData.emploi !== 'Message Linkedin' && (
              <input type="text" name="emploi" placeholder="Emploi" value={formData.emploi || ''} onChange={handleInputChange} required />
            )}
          </td>
          <td><input type="text" name="lien" placeholder="Lien" value={formData.lien || ''} onChange={handleInputChange} required /></td>

          <td 
          onClick={handleDateClick}>
            {isEditingDate ? (
              <input
                type="date"
                name="date"
                value={formData.date || currentDate}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="text"
                value={currentDate}
                onChange={handleInputChange}
                onBlur={handleDateBlur}
              />
            )}
          </td>
          <td>
            <select name="ville" value={formData.ville} onChange={handleInputChange}>
              <option value="">Select Type</option>
              <option value="Distanciel">Distanciel</option>
              <option value="other">Other</option>
            </select>
            {formData.ville !== 'distanciel' && (
              <input type="text" name="ville" placeholder="Ville" value={formData.ville || ''} onChange={handleInputChange} required />
            )}
          </td>
          <td><input type="text" name="site" placeholder="Site" value={formData.site || ''} onChange={handleInputChange} required /></td>
          <td>
            <select name="versionCV" value={formData.versionCV || 'version1'} onChange={handleInputChange}>
              <option value="Fullstack">Fullstack</option>
              <option value="Network">Network</option>
              <option value="DevOps">DevOps</option>
              <option value="English">English</option>
              {/* Add more versions as needed */}
            </select>
          </td>

          <td>
            <Select
              value={statusOptions.find(option => option.value === formData.status)}
              onChange={(selectedOption) => setFormData((prevData) => ({ ...prevData, status: selectedOption?.value || '' }))}
              options={statusOptions}
              isSearchable
              placeholder="Sélectionnez le statut"
            />
          </td>
          <td><button type="submit" onClick={handleSubmit}>Add Job</button></td>
        </tr>
        {/* Map through sortedJobs and render job details */}
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
