/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "phosphor-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <IconContext.Provider
      value={{
        color: "black",
        size: 24,
        // weight: "bold",
        mirrored: false,
      }}
    >
      <App />
    </IconContext.Provider>
  </BrowserRouter>
);
