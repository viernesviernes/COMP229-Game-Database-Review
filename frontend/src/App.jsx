import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Games from "./components/Games"; 
import GameDetails from "./components/GameDetails";
import { ThemeProvider } from "./ColorTheme";
import { UserProvider } from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="159976334384-t5n83o9qjbscgugor7kpo5j65sjldrh5.apps.googleusercontent.com">
      <ThemeProvider>
        <UserProvider>
          <Routes>
            {/* Default route redirects to the login page */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
