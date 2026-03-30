import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./RabbitMap.css";

import bgMapFrame from "../../assets/rabbitRoom/bg-map.png";
import mapDefault from "../../assets/rabbitRoom/map-default.png";
import mapHospital from "../../assets/rabbitRoom/map-hospital.png";
import mapExotic from "../../assets/rabbitRoom/map-exotic-hospital.png";
import bgRabbitEnd from "../../assets/rabbitRoom/bg-rabbit-end.png";
import nextArrow from "../../assets/components/next-arrow.png";
import homeCircle from "../../assets/components/home-circle-button.png";

const RabbitMap = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("default");
  const [isEnd, setIsEnd] = useState(false);

  const toggleView = (view: string) => {
    setCurrentView(currentView === view ? "default" : view);
  };

  const getMapAsset = () => {
    if (currentView === "hospital") return mapHospital;
    if (currentView === "exotic") return mapExotic;
    return mapDefault;
  };

  const handleBackToLobby = () => {
    localStorage.setItem("rabbit_completed", "true");
    navigate("/lobby");
  };

  return (
    <motion.div
      className="map-sub-page-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="map-content-wrapper">
        <img src={bgMapFrame} className="map-frame-img" alt="frame" />

        <div className="map-window-container">
          <img
            src={getMapAsset()}
            className="map-actual-img"
            alt="map content"
          />

          <div className="map-tabs-overlay">
            <div
              className="tab-hitbox"
              onClick={() => toggleView("hospital")}
              style={{ left: "0%", width: "22%" }}
            />
            <div
              className="tab-hitbox"
              onClick={() => toggleView("exotic")}
              style={{ left: "22%", width: "31%" }}
            />
          </div>
        </div>

        {!isEnd && (
          <motion.img
            src={nextArrow}
            className="map-next-arrow"
            onClick={() => setIsEnd(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          />
        )}
      </div>

      <AnimatePresence>
        {isEnd && (
          <motion.div
            className="rabbit-end-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img src={bgRabbitEnd} className="full-img" alt="end" />
            <motion.img
              src={homeCircle}
              className="map-home-circle"
              onClick={handleBackToLobby}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RabbitMap;