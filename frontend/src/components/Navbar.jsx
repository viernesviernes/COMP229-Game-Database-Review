import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
      <img src="GameSphere.png" alt="GameSphere Logo" className={styles.logoImage} />
        <Link to="/">Game Database</Link>
        
      </div>
      <div className={styles.navLinks}>
        <Link to="/games">Games</Link>
        <div className={styles.dropdown}>
          <span>Genre ▼</span>
          <div className={styles.dropdownContent}>
            <Link to="/genre/action">Action</Link>
            <Link to="/genre/adventure">Adventure</Link>
            <Link to="/genre/rpg">RPG</Link>
          </div>
        </div>
        <Link to="/latest">Latest</Link>
        <Link to="/newest">Newest Additions</Link>
      </div>
      
      {/* ADD CONDITIONALS HERE */}

      <div className={styles.authButtons}>
        <Link to="/login" className={styles.loginButton}>
          Log In
        </Link>
        <Link to="/signup" className={styles.signupButton}>
          Sign Up
        </Link>
      </div>
      <div className={styles.useractions}>
          <button className="notifications">🔔 Notifications</button>
          <button className="favorites">⭐ Favorites</button>
          <button className="profile">👤</button>
      </div>
    </div>
  );
};

export default Navbar;
