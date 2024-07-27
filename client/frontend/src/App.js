import logo from './logo.svg';
import './App.css';

// App.js

import React, { useState, useEffect } from 'react';
import JobTable from './components/JobTable/JobTable'; // Adjust the path based on your project structure
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import JobDetailsPage from './components/JobTable/JobDetailsPage';
import SearchButton from './components/SearchBar/SearchButton'; // Import the SearchButton component
import { fetchJobs } from './api/jobApi';


function App() {
  // Sample job data (replace with your actual data)

  const [jobs, setJobs] = useState([]);

  useEffect(() => { // will be called twice in Strict mode in development 
    const fetchJobsData = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobsData();
  }, []);

  return (
    <Router>
      <div className="App">
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
        <Link to="/">Home</Link>
      </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>   
          <SearchButton link="https://www.linkedin.com/jobs/search/?currentJobId=3977217702&distance=25&f_E=2&f_TPR=r604800&f_WT=2&geoId=105015875&keywords=D%C3%A9veloppeur&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true" buttonText="Search on LinkedIn for 'Developpeur'" />
          <SearchButton link="https://www.linkedin.com/jobs/search/?currentJobId=3879309420&f_E=2&f_TPR=r604800&f_WT=2&geoId=105015875&keywords=Ing%C3%A9nieur&location=France&origin=JOB_SEARCH_PAGE_KEYWORD_AUTOCOMPLETE&refresh=true" buttonText="Search on LinkedIn for 'Ingenieur'" />
          <SearchButton link="https://fr.indeed.com/emplois?q=d%C3%A9veloppeur&sc=0bf%3Aexrec%28%29%2Ckf%3Aattr%28DSQF7%29jt%28permanent%29%3B&fromage=7&vjk=55d29b161267e576" buttonText="Search on Indeed for 'Developpeur'" />
          <SearchButton link="https://fr.indeed.com/emplois?q=Ingenieur+OR+engineer&sc=0bf%3Aexrec%28%29%2Ckf%3Aattr%28DSQF7%29jt%28permanent%29%3B&fromage=7&vjk=1d4efc57e7a904cc" buttonText="Search on Indeed for 'Ingenieur'" />
          <SearchButton link="https://www.monster.fr/emploi/recherche?q=Ing%C3%A9nieur+DevOps&where=&page=1&et=OTHER&et=REMOTE&recency=last+week&so=m.s.sh" buttonText="Search on  Monster for 'Ingenieur'" />
          <SearchButton link="https://www.welcometothejungle.com/fr/jobs?refinementList%5Boffices.country_code%5D%5B%5D=FR&refinementList%5Bremote%5D%5B%5D=punctual&refinementList%5Bremote%5D%5B%5D=partial&refinementList%5Bremote%5D%5B%5D=fulltime&refinementList%5Bprofession.category_reference%5D%5B%5D=tech-engineering-3NjUy&refinementList%5Bcontract_type%5D%5B%5D=full_time&refinementList%5Bsectors.reference%5D%5B%5D=saas-cloud-services&refinementList%5Bsectors.reference%5D%5B%5D=software-1&refinementList%5Bexperience_level_minimum%5D%5B%5D=1-3&refinementList%5Bexperience_level_minimum%5D%5B%5D=0-1&query=ingenieur&page=1&sortBy=mostRecent" buttonText="Search on  Welcome to the jungle for 'Ingenieur'" />
          <SearchButton link="https://www.apec.fr/candidat/recherche-emploi.html/emploi?lieux=75&motsCles=Developpeur%20OU%20DevOps%20OU%20logiciel%20OU%20Reseau%20OU%20Developpeur%20Logiciel&salaireMinimum=34&salaireMaximum=200&fonctions=101833&fonctions=101831&typesContrat=101888&typesConvention=143684&typesConvention=143685&typesConvention=143686&typesConvention=143687&anciennetePublication=101851&typesTeletravail=20766&typesTeletravail=20765&typesTeletravail=20767&page=0" buttonText="Search on APEC" />
          <SearchButton link="https://mon-vie-via.businessfrance.fr/offres/recherche?query=engineer%20&specializationsIds=212&specializationsIds=24&missionsTypesIds=3&missionsTypesIds=1" buttonText="Search VIE" />
        {/* <SearchButton link="https://example.com" buttonText="Search Example" /> */}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>   
          <SearchButton link="https://docs.google.com/document/d/1JjB9ErbrD_OA56nlYNbHlhzrKqebAWvIVeULSbjOYTY/edit" buttonText="Preparation entretien" />
          <SearchButton link="https://leetcode.com/problem-list/p8ibwjpv/" buttonText="Leetcode Problems" />
          <SearchButton link="https://chatgpt.com/c/45522194-4ab9-435c-9510-4b478374f403" buttonText="Cover Letter Chat GPT'" />
          <SearchButton link="https://fr.overleaf.com/project/65b91ff64a8e84e449c09ca0" buttonText="Cover Letter Overleaf'" />
          <SearchButton link="https://docs.google.com/document/d/1qxdujzwpfhgD0oi0UhpqXNeFa0-Kk_BihmLGl62ZyzE/edit#heading=h.l0a31ac5f3gg" buttonText="Projets details" />
          {/* <SearchButton link="https://example.com" buttonText="Search Example" /> */}
          <SearchButton link="https://mail.google.com/mail/u/0/d/AEoRXRQA45IbqywlIXdH349tykZ4HS7hXe3s9Acm06pA9xanfak-/" buttonText="Boite Mail" />
          <SearchButton link="https://chatgpt.com/c/b02722d1-3ed1-402c-a881-383cc4b98a44" buttonText="Retour entretien" />
        
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
