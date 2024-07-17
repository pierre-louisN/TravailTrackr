const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverRouter = require('./routes/jobRoutes'); // Adjust the path based on your project structure
const bodyParser = require('body-parser'); // Import body-parser middleware

const server = express();

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/job-manager';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  console.log('Hostname:', mongoose.connection.client.s.url);
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
server.use(bodyParser.json());

// CORS middleware
server.use(cors());

// Use the router middleware
server.use('/api', serverRouter);

// Define root route
server.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the Express app instance
module.exports = server;
