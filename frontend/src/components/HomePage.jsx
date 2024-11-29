import React from 'react';
import './HomePage.css'; // Import the CSS for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Game Database</div>
        <nav className="nav-links">
          <a href="/games">Games</a>
          <a href="/genre">Genre</a>
          <a href="/latest">Latest</a>
          <a href="/newest-additions">Newest Additions</a>
        </nav>
        <div className="user-actions">
          <button className="notifications">🔔 Notifications</button>
          <button className="favorites">⭐ Favorites</button>
          <button className="profile">👤</button>
        </div>
      </header>
      <main className="main-content">
        <div className="welcome-message">
          <h1>The Game Database</h1>
          <p>Explore our comprehensive game database. Search by title, genre, or platform to find the information you need.</p>
          <input type="text" className="search-bar" placeholder="Enter a game name" />
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
