// src/routes.js
const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController'); // Create this file

router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
 