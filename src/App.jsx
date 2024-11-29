import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { ThemeProvider } from "./ColorTheme"; // Ensure this path is correct
import { UserProvider } from "./UserContext"; // Ensure this path is correct

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ul>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
