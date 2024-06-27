// src/routes.js
const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, createJob, updateJob, deleteJob, addNoteToJob, getJobNotes } = require('../controllers/jobController'); // Create this file
const { generateNewCV, downloadCV } = require('../services/cvService'); // Import the generateCV function


router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
router.post('/jobs/:id/notes', addNoteToJob);
router.get('/jobs/:id/notes', getJobNotes);
// router.put('/jobs/:id/notes', updateJobNotes);


// Define route for generating CVs
router.post('/generate-cv', async (req, res) => {
    const { companyName, version } = req.body;
    try {
      // Call the generateCV function from the service
      console.log(`Company: ${companyName}, Version: ${version}`);
      await generateNewCV(companyName, version);
      res.status(200).json({ message: 'CV generated successfully' });
    } catch (error) {
      console.error('Error generating CV:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Define route for downloading CVs
router.get('/download-cv/:cvVersion', async (req, res) => {
  const { cvVersion } = req.params;
  try {
    // Call the downloadCV function from the service
    await downloadCV(cvVersion, res); // Pass the response object to the downloadCV function
  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
 