import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Layout from './Layout';
import '../styles/home.css';

const Home = () => {
  return (
    <Layout>
      <div className='home-container'>
        <div className="hero-content">
          <h1>Welcome to Our Recipe App</h1>
          <p>Discover the best recipes from Kenyan cuisine and more!</p>
          <Link to="/recipes" className="cta-button">More About Us</Link>
        </div>
        <div className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonials-container">
            <div className="testimonial">
              <p>"This app has changed the way I cook! The recipes are fantastic and easy to follow."</p>
              <p>- Alex M.</p>
            </div>
            <div className="testimonial">
              <p>"I love discovering new recipes here. The app is so user-friendly and helpful!"</p>
              <p>- Jamie L.</p>
            </div>
            <div className="testimonial">
              <p>"A wonderful resource for anyone who loves Kenyan cuisine. Highly recommend!"</p>
              <p>- Sam O.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
