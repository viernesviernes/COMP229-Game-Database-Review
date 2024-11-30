import React from 'react';
import Navbar from './Navbar';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar /> {/* Reuse the Navbar component */}
      <main className="main-content">
        <div className="welcome-message">
          <h1>The Game Database</h1>
          <p>
            Explore our comprehensive game database. Search by title, genre, or platform to find the information you need.
          </p>
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a game name"
          />
        </div>
        <div className="game-illustrations">
          {/* Placeholder for illustrations */}
          <div className="illustration-box"></div>
          <div className="illustration-box"></div>
          <div className="illustration-box"></div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
