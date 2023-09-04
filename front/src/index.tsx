import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { SessionContextProvider } from "./views/sessionContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
