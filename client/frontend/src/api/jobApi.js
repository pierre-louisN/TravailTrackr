import axios from 'axios';

// const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
// const API_URL = process.env.NODE_ENV === 'production' ? '/backend' : 'http://localhost:8080';
// const API_URL = process.env.REACT_APP_BACKEND_URL || '/backend';


export const fetchJobs = async () => {
  // console.log("API URL:", API_URL);  // Add this line to log the API URL
  try {
    const response = await axios.get(`/api/jobs`);
    return response.data.jobs.map(job => ({
      id: job._id.toString(),
      lien: job.lien,
      emploi: job.emploi,
      date: job.date,
      ville: job.ville,
      site: job.site,
      versionCV: job.versionCV,
      status: job.status
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error; // Rethrow the error to handle in components
  }
};
export const getJobNotes = async (jobId) => {
  const response = await fetch(`/${jobId}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const addJobNote = async (jobId, noteContent) => {
  const response = await fetch(`/${jobId}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: noteContent }),
  });
  if (!response.ok) {
    throw new Error('Failed to add note');
  }
  return response.json();
};
// Define other API functions similarly...
