// Import necessary modules
// const express = require('express');
// // const serverRouter = require('./server'); // Import the router module
// const serverRouter = require('./routes/jobRoutes'); // Import the router module
// const mongoose = require('mongoose');

// // Create an Express application
// const app = express();

// mongoose.connect('mongodb://localhost:27017/job-manager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// // Mount the router middleware
// app.use('/', serverRouter);

// // Define port
// const PORT = process.env.PORT || 3000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const cors = require('cors');


const app = require('./server');

app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});