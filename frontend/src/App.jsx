import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Games from "./components/Games"; 
import GameDetails from "./components/GameDetails";
import Latest from "./components/Latest"; 
import { ThemeProvider } from "./ColorTheme";
import { UserProvider, UserContext } from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="159976334384-t5n83o9qjbscgugor7kpo5j65sjldrh5.apps.googleusercontent.com">
      <ThemeProvider>
        <UserProvider>
          <AuthRedirect />
          <Routes>
            {/* Default route redirects to the login page */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/latest" element={<Latest />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

// A component that redirects logged-in users to the home page
const AuthRedirect = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return null;
};

export default App;
