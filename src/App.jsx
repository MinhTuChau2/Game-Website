import  "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import GamePage from "./assets/pages/GamePage";
import { useState } from "react";

function App(){
 const [isAuth, setIsAuth] = useState(false);

return (

        <Router>
        <nav>
                <Link to="/"> Home </Link>


                  <Link to="/loginpage"> Login </Link>


                    <Link to="/GamePage"> Play Game </Link>
{/*                     <button onClick={signUserOut}> Log Out</button> */}


              </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginpage" element={<LoginPage setIsAuth={setIsAuth} />} />
                <Route path="/GamePage" element={<GamePage />} />

            </Routes>
        </Router>

)
}

export default App;