import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { ThemeContext } from "../ColorTheme";
import { UserContext } from "../UserContext";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "./Navbar"; // Import your Navbar component
import styles from "./signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { signup, googleLogin } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const result = await signup(username, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  const handleGoogleSignupSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const result = await googleLogin(googleToken);
      if (result.success) {
        navigate("/home");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Google Signup Failed:", error);
      setError("Google Signup failed. Please try again.");
    }
  };

  const handleGoogleSignupError = () => {
    setError("Google Signup failed. Please try again.");
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.signupContainer} ${styles[theme]}`}>
        <div className={styles.signupCard}>
          <h1 className={styles.title}>Create Account</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSignup} className={styles.form}>
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
                type={showPassword ? "text" : "password"}
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
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <GoogleLogin
              onSuccess={handleGoogleSignupSuccess}
              onError={handleGoogleSignupError}
              render={(renderProps) => (
                <button
                  type="button"
                  className={styles.googleButton}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FaGoogle className={styles.googleIcon} />
                  Sign in with Google
                </button>
              )}
            />
          </div>
          <p className={styles.loginPrompt}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
