import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/recipes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data in App:', data); // Log data for debugging
        setBackendData(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes Data={backendData} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
