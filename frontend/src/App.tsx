import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import {
  CVPage,
  GitHubHomePage,
  LinkedInPage,
  GitHubDirectoryViewPage,
} from "./pages";
import "./App.css";
import { useError } from "./utils/context/ErrorContext";

const App = () => {
  const { error, setError } = useError();

  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" Component={CVPage} />
            <Route path="/github" Component={GitHubHomePage} />
            <Route path="/github/*" Component={GitHubDirectoryViewPage} />
            <Route path="/linkedIn" Component={LinkedInPage} />
          </Routes>
        </main>
        <Modal
          isVisible={!!error}
          message={error || ""}
          onClose={() => setError(null)}
        />
      </div>
    </Router>
  );
};

export default App;
