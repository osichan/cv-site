import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorProvider } from "./utils/context/ErrorContext";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </React.StrictMode>
);
