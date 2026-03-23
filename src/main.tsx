import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/introPage/IntroPage";
import StartPage from "./pages/startPage/StartPage";
import LobbyPage from "./pages/lobbyPage/LobbyPage";
import SugarGliderRoom from "./pages/sugarGliderRoom/SugarGliderRoom";
import HamsterRoom from "./pages/hamsterRoom/HamsterRoom";
import HedgehogRoom from "./pages/hedgehogRoom/HedgehogRoom";
import RabbitRoom from "./pages/rabbitRoom/RabbitRoom";
import SquirrelRoom from "./pages/squirrelRoom/SquirrelRoom";
import SecretRoom from "./pages/secretRoom/SecretRoom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/room/sugar" element={<SugarGliderRoom />} />
        <Route path="/room/rabbit" element={<RabbitRoom />} />
        <Route path="/room/hamster" element={<HamsterRoom />} />
        <Route path="/room/squirrel" element={<SquirrelRoom />} />
        <Route path="/room/hedgehog" element={<HedgehogRoom />} />
        <Route path="/room/secret" element={<SecretRoom />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);