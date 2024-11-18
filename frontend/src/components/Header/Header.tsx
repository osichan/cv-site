import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="google-cloud">
        <img
          src={require("../../assets/GoogleCloudIcon.png")}
          alt="Google Cloud"
          className="google-cloud-icon"
        />
        <span className="google-cloud-text">Powered by Google Cloud</span>
      </div>
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
