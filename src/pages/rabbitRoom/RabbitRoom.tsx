import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./RabbitRoom.css";

import bgAdoptPage from "../../assets/rabbitRoom/rabbit-background.png";
import bgMain from "../../assets/rabbitRoom/bg-main.png";
import rabbitMain from "../../assets/rabbitRoom/rabbit.png";
import homeIcon from "../../assets/components/home-icon.png";
import adoptBtnImg from "../../assets/components/adopt-button.png";
import cupboardClose from "../../assets/rabbitRoom/cupboard-close.png";
import cupboardOpen from "../../assets/rabbitRoom/cupboard-open.png";
import topicMain from "../../assets/rabbitRoom/topic-main.png";
import bgWindow from "../../assets/rabbitRoom/bg-window.png";
import windowImg from "../../assets/rabbitRoom/window.png";
import clickIcon from "../../assets/components/click-icon.png";

const RabbitRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWindowLayer, setShowWindowLayer] = useState(false);
  const [isWindowHovered, setIsWindowHovered] = useState(false);

  const handleAdopt = () => {
    setIsAdopted(true);
  };

  const handleCarrotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWindowLayer(true);
  };

  const handleWindowTriggerClick = () => {
    console.log("Next Step after window dropped!");
  };

  return (
    <motion.div
      className="rabbit-room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="rabbit-responsive-container">
        {/* Home Button */}
        <motion.button
          className="rabbit-home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          style={{ zIndex: 9000 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        {/* 1. Main Room Layer */}
        <AnimatePresence mode="popLayout">
          {isAdopted && !showWindowLayer && (
            <motion.div
              key="main-room"
              className="rabbit-bg-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ zIndex: 10 }}
            >
              <img src={bgMain} className="rabbit-img-full" alt="bg-main" />

              <motion.div
                className="rabbit-char-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
              >
                <img
                  src={rabbitMain}
                  className="rabbit-char-img"
                  alt="Rabbit"
                />
              </motion.div>

              <div
                className="rabbit-cupboard-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={isHovered ? cupboardOpen : cupboardClose}
                  className="rabbit-cupboard-img"
                  alt="Cupboard"
                />
                {isHovered && (
                  <div
                    className="cupboard-carrot-trigger"
                    onClick={handleCarrotClick}
                  />
                )}
              </div>

              <motion.div className="rabbit-topic-container">
                <img
                  src={topicMain}
                  className="rabbit-topic-img"
                  alt="Topic Health"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Window Layer */}
        <AnimatePresence mode="popLayout">
          {showWindowLayer && (
            <motion.div
              key="window-layer"
              className="rabbit-window-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ zIndex: 100 }}
            >
              <img src={bgWindow} className="rabbit-img-full" alt="bg-window" />

              <motion.div
                className="rabbit-window-container"
                onMouseEnter={() => setIsWindowHovered(true)}
                onMouseLeave={() => setIsWindowHovered(false)}
                onClick={handleWindowTriggerClick}
                animate={{
                  rotate: isWindowHovered ? -15 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={windowImg}
                  className="rabbit-window-img"
                  alt="Window"
                />
                <AnimatePresence>
                  {!isWindowHovered && (
                    <motion.img
                      src={clickIcon}
                      className="window-click-icon"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      alt="Click here"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Adopt Overlay */}
        <AnimatePresence mode="popLayout">
          {!isAdopted && (
            <motion.div
              key="adopt-overlay"
              className="rabbit-adopt-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ zIndex: 200 }}
            >
              <img
                src={bgAdoptPage}
                className="rabbit-img-full"
                alt="adopt page"
              />
              <motion.img
                src={adoptBtnImg}
                className="rabbit-adopt-btn-pos"
                onClick={handleAdopt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Outlet />
      </div>
    </motion.div>
  );
};

export default RabbitRoom;