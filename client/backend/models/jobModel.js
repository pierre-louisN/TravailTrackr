const mongoose = require('mongoose');

// Define the schema for the Job model
const jobSchema = new mongoose.Schema({
  
  emploi: {
    type: String,
    required: true
  },
  lien: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ville: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  },
  versionCV: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

// Specify the collection name
const collectionName = process.env.TEST_COLLECTION || 'jobs'; // Replace 'your_collection_name' with the desired collection name

// Create the Job model using the schema and specify the collection
const Job = mongoose.model('Job', jobSchema, collectionName);

module.exports = Job;