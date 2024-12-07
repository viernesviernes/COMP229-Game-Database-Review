import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
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
  const { user } = useContext(UserContext);

  return (
    <GoogleOAuthProvider clientId="159976334384-t5n83o9qjbscgugor7kpo5j65sjldrh5.apps.googleusercontent.com">
      <ThemeProvider>
        <UserProvider>
          <Routes>
            {/* Redirect to /home if the user is logged in */}
            <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <Signup />} />
            <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" replace />} />
            <Route path="/games" element={user ? <Games /> : <Navigate to="/login" replace />} />
            <Route path="/games/:id" element={user ? <GameDetails /> : <Navigate to="/login" replace />} />
            <Route path="/latest" element={user ? <Latest /> : <Navigate to="/login" replace />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
