// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import header-specific styles

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              CV
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/github" className="nav-link">
              GitHub
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/linkedIn" className="nav-link">
              LinkedIn
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
