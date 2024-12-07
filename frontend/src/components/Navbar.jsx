import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import styles from './navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <div className="logo">
          <Link to="/home">GameSphere</Link>
        </div>
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
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
