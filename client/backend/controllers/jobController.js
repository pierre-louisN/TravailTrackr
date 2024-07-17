// src/controllers/jobController.js

const Job = require('../models/jobModel');

const JOB = Job;

  const getAllJobs = async (req, res) => {
    try {
      console.log('get all jobs');
      // Fetch all jobs from the database
      const jobs = await Job.find();

      // Send the jobs as the response
      res.status(200).json({jobs : jobs});
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getJobById = async (req, res) => {
    const jobId = req.params.id;
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(job);
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const createJob = async (req, res) => {
    // const { emploi, lien, ville, site, versionCV, status } = req.body;
    // const newJob = new JOB(req.body);
    try {
      const newJob = new JOB(req.body);
      // const newJob = await Job.create({ emploi, lien, ville, site, versionCV, status });
      await newJob.save();
      res.status(201).json(newJob);

      console.log('Job created successfully:', newJob);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // const updateJob = async (req, res) => {
  //   const jobId = req.params.id;
  //   const { emploi, lien, ville, site, versionCV, status } = req.body;
  //   try {
  //     const updatedJob = await Job.findByIdAndUpdate(jobId, { emploi, lien, ville, site, versionCV, status }, { new: true });
  //     if (!updatedJob) {
  //       return res.status(404).json({ message: 'Job not found' });
  //     }
  //     res.status(200).json(updatedJob);
  //   } catch (error) {
  //     console.error('Error updating job:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };
  

  const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const updatedData = req.body;
  
    try {
      const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
      if (!updatedJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    try {
      const deletedJob = await Job.findByIdAndDelete(jobId);
      if (!deletedJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // New function to get notes from a specific job
const getJobNotes = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log('job not found')
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job.notes);
  } catch (error) {
    console.error('Error fetching job notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  const addNoteToJob = async (req, res) => {
    const jobId = req.params.id;
    const { content } = req.body;
  
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      job.notes.push({ content });
      await job.save();
  
      res.status(200).json(job);
    } catch (error) {
      console.error('Error adding note to job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getJobNotes,
    addNoteToJob
  };
  