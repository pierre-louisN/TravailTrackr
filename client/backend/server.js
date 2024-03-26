// // server.js

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Define routes
// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Import necessary modules
const express = require('express');

const mongoose = require('mongoose');
const serverRouter = require('./routes/jobRoutes'); // Import the router module
const bodyParser = require('body-parser'); // Import body-parser middleware



const server = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/job-manager')
.then(() => {
  console.log('MongoDB connected');
  console.log('Hostname:', mongoose.connection.client.s.url);
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => console.error('MongoDB connection error:', err));


// // Create an Express router
// const router = express.Router();

// // Define routes
// router.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Export the router
// module.exports = router;

// Middleware to parse JSON bodies
server.use(bodyParser.json());

// Use the router middleware
server.use('/api', serverRouter);

// Define routes
server.get('/', (req, res) => {
res.send('Hello, world!');
});

// Export the Express app instance
module.exports = server;
