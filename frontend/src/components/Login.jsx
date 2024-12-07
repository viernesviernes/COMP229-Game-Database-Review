import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { ThemeContext } from '../ColorTheme';
import { UserContext } from '../UserContext';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import styles from './login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log('Google Login Successful:', credentialResponse);
    const token = credentialResponse.credential;
    const result = await googleLogin(token);
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };  

  const handleGoogleLoginError = () => {
    console.error('Google Login Failed');
    setError('Google Login failed. Please try again.');
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.loginContainer} ${styles[theme]}`}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Welcome Back</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
          </form>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            render={(renderProps) => (
              <button
                className={styles.googleButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FaGoogle className={styles.googleIcon} />
                Continue with Google
              </button>
            )}
          />
          <p className={styles.signupPrompt}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
