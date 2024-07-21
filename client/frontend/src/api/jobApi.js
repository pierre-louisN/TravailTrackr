import axios from 'axios';

export const fetchJobs = async () => {
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

export const addNewJob = async (newJobData) => {
  try {
    const response = await axios.post('/api/jobs', newJobData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add new job');
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`/api/jobs/${id}`);
    return response.status === 200;
  } catch (error) {
    throw new Error('Failed to delete job');
  }
};

export const updateJobStatus = async (jobId, status) => {
  try {
    const response = await axios.put(`/api/jobs/${jobId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating job status:', error);
    throw error;
  }
};

export const downloadCV = async (cvVersion) => {
  try {
    const response = await axios.get(`/api/download-cv/${cvVersion}`, {
      responseType: 'blob', // Set the response type to blob to handle binary data (PDF file)
    });

    // Extract the filename from the Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    const match = contentDisposition.match(/filename=(.+)/);
    const filename = match && match[1];

    // Create a URL object from the blob data
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Set the filename for the downloaded file
    document.body.appendChild(link);

    // Click the anchor element to start the download
    link.click();

    // Clean up by removing the anchor element and revoking the URL object
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (error) {
    console.error('Error downloading CV:', error);
    throw error;
  }
};
export const getJobNotes = async (jobId) => {
  const response = await fetch(`/api/jobs/${jobId}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const addJobNote = async (jobId, noteContent) => {
  const response = await fetch(`/api/jobs/${jobId}/notes`, {
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
