import React, { useState, ChangeEvent } from 'react'; // Import React and necessary hooks
import JobItem from './JobItem';
import { Job } from './JobModel';


interface JobListProps {
  jobs: Job[];
  onSubmit: (newJob: Job) => void;
  onDelete: (id: string) => void; // Define onDelete prop
}

const JobList: React.FC<JobListProps> = ({ jobs, onSubmit, onDelete }) => {

  // const [formData, setFormData] = useState<Partial<Job>>({}); // State for form data
  
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission status
  // const [jobs, setJobs] = useState<Job[]>([]); // State for jobs fetched from server
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [isEditingDate, setIsEditingDate] = useState(false); // State to track if date is being edited
  const initialDate = new Date().toISOString().slice(0, 10); // Get today's date in the required format
  const [formData, setFormData] = useState<Partial<Job>>({
    date: initialDate,
    versionCV: 'Version 1', // Set default value for versionCV
    status: 'Envoye', // Set default value for status
  });
  const [inputValue, setInputValue] = useState('');

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
    };
    console.log(newJob);
    onSubmit(newJob);
    // setFormData({});
    handleDateBlur();
    setFormData({ 
      date: initialDate,
      versionCV: 'Version 1', // Set default value for versionCV
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
          <td><input type="text" name="emploi" placeholder="Emploi" value={formData.emploi || ''} onChange={handleInputChange} required /></td>
          <td><input type="text" name="lien" placeholder="Lien" value={formData.lien || ''} onChange={handleInputChange} required /></td>

          <td 
          // onClick={() => setIsEditingDate(true)} onBlur={handleDateBlur} tabIndex={0}>
          //   {isEditingDate ? (
          //     <input type="date" name="date" value={formData.date || initialDate} onChange={handleInputChange} />
          //   ) : (
          //     new Date(formData.date as string).toLocaleDateString() || new Date(initialDate).toLocaleDateString()
          //   )}
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

          


          <td><input type="text" name="ville" placeholder="Ville" value={formData.ville || ''} onChange={handleInputChange} required /></td>
          <td><input type="text" name="site" placeholder="Site" value={formData.site || ''} onChange={handleInputChange} required /></td>
          <td>
            <select name="versionCV" value={formData.versionCV || 'Version 1'} onChange={handleInputChange}>
              <option value="Version 1">Version 1</option>
              <option value="Version 2">Version 2</option>
              {/* Add more versions as needed */}
            </select>
          </td>
          <td>
            <select name="status" value={formData.status || 'Envoye'} onChange={handleInputChange}>
              <option value="Envoye">Envoye</option>
              <option value="Recu">Recu</option>
              {/* Add more statuses as needed */}
            </select>
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
