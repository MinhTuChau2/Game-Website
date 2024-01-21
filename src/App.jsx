import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import GamePage from "./assets/pages/GamePage";
import Thankyou from "./assets/pages/Thankyou";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  // Retrieve authentication status from localStorage on mount
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  useEffect(() => {
    // Check authentication status on mount
    const user = auth.currentUser;
    if (user) {
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
    }
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/loginpage"> Login </Link>
        ) : (
          <>
            <Link to="/GamePage"> GamePage </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Thankyou" element={<Thankyou isAuthenticated={isAuth} />} />
        <Route
          path="/GamePage"
          element={<GamePage isAuthenticated={isAuth} />}
        />
        <Route
          path="/loginpage"
          element={<LoginPage setIsAuth={setIsAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
