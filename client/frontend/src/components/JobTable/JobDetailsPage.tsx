// frontend/src/components/JobTable/JobDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobNotes, addJobNote } from '../../api/jobApi';
import { Job, Note } from './JobModel';


interface JobDetailsPageProps {
  jobs: Job[];
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ jobs }) => {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const selectedJob = jobs.find((job) => job.id === id);

 

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const notesData = await getJobNotes(id);
        
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [id]);

  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  const handleNewNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      try {
        const updatedJob = await addJobNote(id, newNote);
        setNotes(updatedJob.notes);
        setNewNote('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h2>{selectedJob.emploi}</h2>
      {/* <p>{selectedJob.lien}</p> */}
      <p>
        <Link to={selectedJob.lien} target="_blank">{selectedJob.lien}</Link>
      </p>
      <div>
        <h3>Notes:</h3>
        <ul>
          <div style={{ whiteSpace: 'pre-line' }}> 
            {notes.map((note, index) => (
              <li key={index}>
                <strong>{new Date(note.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: 'numeric',
                  minute: '2-digit',
                })}</strong> {note.content}
              </li>
            ))}
          </div>
        </ul>
      </div>

      <div>
        <textarea
          value={newNote}
          onChange={handleNewNoteChange}
          placeholder="Enter your note here"
          style={{ width: '80%', height: '100px', resize: 'none' }}
        />
        <button onClick={handleAddNote} style={{ marginTop: '10px' }}>Add Note</button>
      </div>

      <Link to="/">Back to Job List</Link>
    </div>
  );
};

export default JobDetailsPage;
