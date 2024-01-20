import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="navBar">
      <ul className="navBar">
        <li>
          <a href="/">Home Page</a>
        </li>
        <li>
          <a href="/calculator">Interest Calculator</a>
        </li>
        <li>
          <a href="/debtVisual">Debt</a>
        </li>
        <li id="login">
          <a href="/login">Login</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
