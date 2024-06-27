// frontend/src/api/jobApi.js

const API_URL = 'http://localhost:3001/api/jobs'; // Replace with your actual API URL

export const getJobNotes = async (jobId) => {
  const response = await fetch(`${API_URL}/${jobId}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const addJobNote = async (jobId, noteContent) => {
  const response = await fetch(`${API_URL}/${jobId}/notes`, {
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
