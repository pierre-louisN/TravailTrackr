import logo from './logo.svg';
import './App.css';

// App.js

import React, { useState, useEffect } from 'react';
import JobTable from './components/JobTable/JobTable'; // Adjust the path based on your project structure
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobDetailsPage from './components/JobTable/JobDetailsPage';
import axios from 'axios';
import SearchButton from './components/SearchBar/SearchButton'; // Import the SearchButton component


function App() {
  // Sample job data (replace with your actual data)

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch all jobs
    axios.get('/api/jobs')
      .then(response => {
        // Set the fetched jobs to state
        console.log(response.data.jobs);
        if (response.status === 200) {
          const transformedJobs = response.data.jobs.map(job => ({
            id: job._id.toString(), // Convert ObjectID to string
            lien: job.lien,
            emploi: job.emploi,
            date: job.date,
            ville: job.ville,
            site: job.site,
            versionCV: job.versionCV,
            status: job.status
          }));
          setJobs(transformedJobs); // Update state with fetched jobs
        } else {
          console.error('Failed to fetch jobs:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render


  return (
    <Router>
      <div className="App">


        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>   
        <SearchButton link="https://www.linkedin.com/jobs/search/?currentJobId=3884346676&f_E=2&f_TPR=r604800&f_WT=2&keywords=D%C3%A9veloppeur&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true" buttonText="Search on LinkedIn for 'Developpeur'" />
        <SearchButton link="https://www.linkedin.com/jobs/search/?currentJobId=3879309420&f_E=2&f_TPR=r604800&f_WT=2&geoId=105015875&keywords=Ing%C3%A9nieur&location=France&origin=JOB_SEARCH_PAGE_KEYWORD_AUTOCOMPLETE&refresh=true" buttonText="Search on LinkedIn for 'Ingenieur'" />
        <SearchButton link="https://fr.indeed.com/emplois?q=d%C3%A9veloppeur&sc=0bf%3Aexrec%28%29%2Ckf%3Aattr%28DSQF7%29jt%28permanent%29%3B&fromage=7&vjk=55d29b161267e576" buttonText="Search on Indeed for 'Developpeur'" />
        <SearchButton link="https://fr.indeed.com/emplois?q=Ingenieur+OR+engineer&sc=0bf%3Aexrec%28%29%2Ckf%3Aattr%28DSQF7%29jt%28permanent%29%3B&fromage=7&vjk=1d4efc57e7a904cc" buttonText="Search on Indeed for 'Ingenieur'" />
        <SearchButton link="https://chatgpt.com/c/45522194-4ab9-435c-9510-4b478374f403" buttonText="Cover Letter Chat GPT'" />
        <SearchButton link="https://www.monster.fr/emploi/recherche?q=Ing%C3%A9nieur+DevOps&where=&page=1&et=OTHER&et=REMOTE&recency=last+week&so=m.s.sh" buttonText="Search on  Monster for 'Ingenieur'" />
        <SearchButton link="https://www.welcometothejungle.com/fr/jobs?refinementList%5Boffices.country_code%5D%5B%5D=FR&refinementList%5Bremote%5D%5B%5D=punctual&refinementList%5Bremote%5D%5B%5D=partial&refinementList%5Bremote%5D%5B%5D=fulltime&refinementList%5Bprofession.category_reference%5D%5B%5D=tech-engineering-3NjUy&refinementList%5Bcontract_type%5D%5B%5D=full_time&refinementList%5Bsectors.reference%5D%5B%5D=saas-cloud-services&refinementList%5Bsectors.reference%5D%5B%5D=software-1&refinementList%5Bexperience_level_minimum%5D%5B%5D=1-3&refinementList%5Bexperience_level_minimum%5D%5B%5D=0-1&query=ingenieur&page=1&sortBy=mostRecent" buttonText="Search on  Welcome to the jungle for 'Ingenieur'" />
        
        {/* <SearchButton link="https://example.com" buttonText="Search Example" /> */}
      </div>
        {/* Define your routes */}
        <Routes>
          
        {/* Render the SearchBar component */}
        {/* Render the JobTable component with the filtered jobs */}
          <Route path="/" element={<JobTable jobs={jobs} />} />
          <Route path="/job/:id" element={<JobDetailsPage jobs={jobs}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
