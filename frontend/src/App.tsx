import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import {
  CVPage,
  GitHubHomePage,
  LinkedInPage,
  GitHubDirectoryViewPage,
} from "./pages";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" Component={CVPage} />
            <Route path="/github" Component={GitHubHomePage} />
            <Route path="/:dirPath*" Component={GitHubDirectoryViewPage} />
            <Route path="/linkedIn" Component={LinkedInPage} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
