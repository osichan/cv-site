// src/pages/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"; // Import Header component
import { CVPage, GitHubPage, LinkedInPage } from "./pages";
import "./App.css"; // Import general styles

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {/* Using Header component */}
        <main>
          <Routes>
            <Route path="/" Component={CVPage} />
            <Route path="/github" Component={GitHubPage} />
            <Route path="/linkedIn" Component={LinkedInPage} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; // Make sure this is there
