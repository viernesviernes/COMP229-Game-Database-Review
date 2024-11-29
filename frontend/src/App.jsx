import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "./ColorTheme";
import { UserProvider } from "./UserContext"; 

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Routes>
          {/* Default route redirects to the login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
