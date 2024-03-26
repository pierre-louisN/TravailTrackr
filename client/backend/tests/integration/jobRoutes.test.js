const request = require('supertest');
// const app = require('../src/index'); // Import your Express app instance
const routes = require('../../routes/jobRoutes'); // Import your Express app instance
// const app = require('../../server'); // Import your Express app instance
const app = require('../../server'); // Import your Express app instance
const mongoose = require('mongoose');
const Job = require('../../models/jobModel');
const axios = require('axios');

describe('Checking Job Routes Existance Tests', () => {
  it('should import routes correctly', () => {
    expect(routes).toBeDefined(); // Check if routes is defined
  });

});

describe('Axios Test', () => {
  it('should make a successful request to a backend route', async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs');
      expect(response.status).toBe(200); // Assuming the route returns a 200 status
      // Add more assertions as needed to validate the response data
    } catch (error) {
      // Handle any errors
      throw error;
    }
  });
});


describe('Job Routes Integration Tests', () => {
  describe('GET /jobs', () => {
    it('should return all jobs', async () => {
      const response = await request(app).get('/api/jobs');
      expect(response.status).toBe(200);
      // expect(response.body.length).toBe(1); // Assuming only one test job was added
      // Add more assertions as needed to validate the response data
    });
  });

  describe('POST /jobs', () => {
    it('should create a new job', async () => {
      const newJob = {
        emploi: 'New Job',
        ville: 'New Ville',
        site: 'New Site',
        versionCV: 'New Version',
        status: 'New Status',
      };

      const response = await request(app)
        .post('/api/jobs')
        .send(newJob);

      expect(response.status).toBe(201); // Assuming you return 201 for successful creation
      expect(response.body).toMatchObject(newJob); // Assuming you return the created job in the response
    });
  });

  describe('DELETE /jobs/:id', () => {
    it('should delete an existing job', async () => {
      // Retrieve the test job added in the setup
      const testJob = await Job.findOne({ emploi: 'New Job' });

      const response = await request(app).delete(`/api/jobs/${testJob._id}`);

      expect(response.status).toBe(200); // Assuming you return 200 for successful deletion
      // expect(response.body).toHaveProperty('message', 'Job deleted successfully'); // Assuming you return a success message
    });
  });
});

  // After all tests have finished running
  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
  });
