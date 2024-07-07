import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import SignInSignUpModal from './components/SignInSignUpModal';
import { AuthProvider } from './pages/AuthContext';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFormType, setInitialFormType] = useState('signIn');

  useEffect(() => {
    fetch('https://sea-turtle-app-ac82n.ondigitalocean.app', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data in App:', data);
        setBackendData(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  const openSignInModal = () => {
    setInitialFormType('signIn');
    setIsModalOpen(true);
  };

  const openSignUpModal = () => {
    setInitialFormType('signUp');
    setIsModalOpen(true);
  };

  return (
    <Router>
      <AuthProvider>
        <Header 
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes Data={backendData} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <SignInSignUpModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialFormType={initialFormType} 
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
