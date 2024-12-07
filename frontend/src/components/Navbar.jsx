import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import styles from './navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Function to prevent navigation if not logged in
  const handleDisabledClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <div className="logo">
          <Link to="/home" onClick={!user ? handleDisabledClick : null}>
            GameSphere
          </Link>
        </div>
      </div>
      <div className={styles.navLinks}>
        <Link to="/games" onClick={!user ? handleDisabledClick : null}>
          Games
        </Link>
        <div className={styles.dropdown}>
          <span>Genre ▼</span>
          <div className={styles.dropdownContent}>
            <Link to="/genre/action" onClick={!user ? handleDisabledClick : null}>
              Action
            </Link>
            <Link to="/genre/adventure" onClick={!user ? handleDisabledClick : null}>
              Adventure
            </Link>
            <Link to="/genre/rpg" onClick={!user ? handleDisabledClick : null}>
              RPG
            </Link>
          </div>
        </div>
        <Link to="/latest" onClick={!user ? handleDisabledClick : null}>
          Latest
        </Link>
      </div>
      <div className={styles.authButtons}>
        {!user ? (
          <>
            <Link to="/login" className={styles.loginButton}>
              Log In
            </Link>
            <Link to="/signup" className={styles.signupButton}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to={`/profile/${user.username}`} className={styles.profileButton}>
              Profile
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
