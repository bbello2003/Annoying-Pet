import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/introPage/IntroPage";
import StartPage from "./pages/startPage/StartPage";
import LobbyPage from "./pages/lobbyPage/LobbyPage";
import SugarGliderRoom from "./pages/sugarGliderRoom/SugarGliderRoom";
import SugarGliderFood from "./pages/sugarGliderRoom/SugarGliderFood";
import SugarGliderDining from "./pages/sugarGliderRoom/SugarGliderDining";
import SugarGliderFoodStat from "./pages/sugarGliderRoom/SugarGliderFoodStat";
import SugarGliderForbiddenFood from "./pages/sugarGliderRoom/SugarGliderForbiddenFood";
import HamsterRoom from "./pages/hamsterRoom/HamsterRoom";
import HedgehogRoom from "./pages/hedgehogRoom/HedgehogRoom";
import HedgehogCleanRoom from "./pages/hedgehogRoom/HedgehogCleanRoom";
import RabbitRoom from "./pages/rabbitRoom/RabbitRoom";
import RabbitOtherFactor from "./pages/rabbitRoom/RabbitOtherFactor";
import RabbitMap from "./pages/rabbitRoom/RabbitMap";
import SquirrelRoom from "./pages/squirrelRoom/SquirrelRoom";
import SquirrelBehavior from "./pages/squirrelRoom/SquirrelBehavior";
import SquirrelSwitch from "./pages/squirrelRoom/SquirrelSwitch";
import SquirrelClean from "./pages/squirrelRoom/SquirrelClean";
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
              <Route path="dining" element={<SugarGliderDining />}>
                <Route path="stats" element={<SugarGliderFoodStat />}>
                  <Route
                    path="forbidden-food"
                    element={<SugarGliderForbiddenFood />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="rabbit" element={<RabbitRoom />}>
            <Route path="factor" element={<RabbitOtherFactor />}>
              <Route path="map" element={<RabbitMap />} />
            </Route>
          </Route>
          <Route path="hamster" element={<HamsterRoom />} />
          <Route path="squirrel" element={<SquirrelRoom />}>
            <Route path="behavior" element={<SquirrelBehavior />}>
              <Route path="switch" element={<SquirrelSwitch />}>
                <Route path="clean" element={<SquirrelClean />} />
              </Route>
            </Route>
          </Route>
          <Route path="hedgehog" element={<HedgehogRoom />}>
            <Route path="clean" element={<HedgehogCleanRoom />} />
          </Route>
          <Route path="secret" element={<SecretRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);