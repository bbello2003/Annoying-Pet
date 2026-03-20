import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/introPage/IntroPage";
import StartPage from "./pages/startPage/StartPage";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);