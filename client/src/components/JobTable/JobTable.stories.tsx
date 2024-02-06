/* eslint-disable */
import React from 'react';
import JobTable from './JobTable';
import sampleJobs from '../sampleJobs'; // Adjust the path based on your project structure

export default {
  title: "JobTable",
};

export const Default = () => <JobTable jobs={sampleJobs} />;

Default.story = {
  name: 'default',
};
