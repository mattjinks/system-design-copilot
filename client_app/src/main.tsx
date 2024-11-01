import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { SystemDesignStateProvider } from "./state/FlowStateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SystemDesignStateProvider>
      <App />
    </SystemDesignStateProvider>
  </React.StrictMode>
);
