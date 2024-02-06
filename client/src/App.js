import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js

import React, { useState } from 'react';
import JobTable from './components/JobTable/JobTable'; // Adjust the path based on your project structure
import SearchBar from './components/SearchBar/SearchBar'; // Adjust the path based on your project structure
import sampleJobs from './components/sampleJobs'; // Adjust the path based on your project structure

function App() {
  // Sample job data (replace with your actual data)

  const [jobs, setJobs] = useState(sampleJobs);

  // Function to handle search term changes
  const handleSearch = (searchTerm) => {
    // Implement search functionality based on your application needs
    // For now, let's filter jobs based on the emploi property
    const filteredJobs = jobs.filter(
      (job) => job.emploi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  return (
    <div className="App">
      {/* Render the SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      {/* Render the JobTable component with the filtered jobs */}
      <JobTable jobs={jobs} />
    </div>
  );
}

export default App;
