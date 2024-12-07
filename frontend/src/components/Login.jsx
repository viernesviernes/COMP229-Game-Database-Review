import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { ThemeContext } from "../ColorTheme";
import { UserContext } from "../UserContext";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { login, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      console.log("Google Login Successful:", credentialResponse);
      // Validate the structure of `credentialResponse` before accessing properties
      if (credentialResponse.credential) {
        const userData = {
          username: credentialResponse.profileObj ? credentialResponse.profileObj.name : "User",
          email: credentialResponse.profileObj ? credentialResponse.profileObj.email : ""
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/home");
      } else {
        throw new Error("Invalid credential response");
      }
    } catch (error) {
      console.error("Error handling Google login:", error);
      setError("Google Login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
    setError("Google Login failed. Please try again.");
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
            useOneTap
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
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
