import "./App.css";
import CalculatorPage from "./assets/pages/CalculatorPage";
import DebtVisualPage from "./assets/pages/DebtVisualPage";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import Header from "./assets/components/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route
            path="/debtVisual"
            element={<DebtVisualPage></DebtVisualPage>}
          />
          <Route
            path="/calculator"
            element={<CalculatorPage></CalculatorPage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
