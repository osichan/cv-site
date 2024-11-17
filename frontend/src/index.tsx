// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component

// Get the root element from the HTML where React will attach the app
const rootElement = document.getElementById("root") as HTMLElement;

// Create a root instance using the root element
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
