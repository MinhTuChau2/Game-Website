import "./App.css";
import CalculatorPage from "./assets/pages/CalculatorPage";
import DebtVisualPage from "./assets/pages/DebtVisualPage";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";

function App() {
  return (
    <>
      <CalculatorPage></CalculatorPage>
      <DebtVisualPage></DebtVisualPage>
      <HomePage></HomePage>
      <LoginPage></LoginPage>
    </>
  );
}

export default App;
