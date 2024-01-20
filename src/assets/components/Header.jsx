import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <ul>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/calculator">calc</a>
        </li>
        <li>
          <a href="/debtVisual">debt</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
