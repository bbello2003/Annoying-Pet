import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/introPage/IntroPage";
import StartPage from "./pages/startPage/StartPage";
import LobbyPage from "./pages/lobbyPage/LobbyPage";
import SugarGliderRoom from "./pages/sugarGliderRoom/SugarGliderRoom";
import SugarGliderFood from "./pages/sugarGliderRoom/SugarGliderFood";
import SugarGliderDining from "./pages/sugarGliderRoom/SugarGliderDining";
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
        <Route path="/lobby" element={<LobbyPage />}>
          <Route path="sugar" element={<SugarGliderRoom />}>
            <Route path="food" element={<SugarGliderFood />}>
              <Route path="dining" element={<SugarGliderDining />}></Route>
            </Route>
          </Route>
          <Route path="rabbit" element={<RabbitRoom />} />
          <Route path="hamster" element={<HamsterRoom />} />
          <Route path="squirrel" element={<SquirrelRoom />} />
          <Route path="hedgehog" element={<HedgehogRoom />} />
          <Route path="secret" element={<SecretRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);