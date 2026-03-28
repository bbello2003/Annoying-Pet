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

const RabbitRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdopt = () => {
    setIsAdopted(true);
  };

  const handleCarrotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Carrot Clicked!");
    // ใส่ Logic เพิ่มเติมที่นี่ เช่น navigate หรือเพิ่มคะแนน
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
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        {/* 1. Main Room Layer */}
        <AnimatePresence>
          {isAdopted && (
            <motion.div
              className="rabbit-bg-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img src={bgMain} className="rabbit-img-full" alt="bg-main" />

              {/* Character */}
              <motion.div
                className="rabbit-char-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <img
                  src={rabbitMain}
                  className="rabbit-char-img"
                  alt="Rabbit"
                />
              </motion.div>

              {/* Cupboard */}
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

                {/* Invisible Carrot Button */}
                {isHovered && (
                  <div
                    className="cupboard-carrot-trigger"
                    onClick={handleCarrotClick}
                  />
                )}
              </div>

              {/* Topic Layer */}
              <motion.div
                className="rabbit-topic-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img
                  src={topicMain}
                  className="rabbit-topic-img"
                  alt="Topic Health"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Adopt Overlay */}
        <AnimatePresence>
          {!isAdopted && (
            <motion.div
              className="rabbit-adopt-overlay"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
                alt="adopt button"
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