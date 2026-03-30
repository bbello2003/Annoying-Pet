import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./RabbitOtherFactor.css";

import bgOtherFactor from "../../assets/rabbitRoom/bg-other-factor.png";
import nextArrow from "../../assets/components/next-arrow.png";
import equipmentFolder from "../../assets/rabbitRoom/equipment-folder.png";
import environmentFolder from "../../assets/rabbitRoom/environment-folder.png";
import geneticFolder from "../../assets/rabbitRoom/genetic-folder.png";
import stressFolder from "../../assets/rabbitRoom/stress-folder.png";
import foodFolder from "../../assets/rabbitRoom/food-folder.png";
import equipmentWindow from "../../assets/rabbitRoom/equipment-window.png";
import environmentWindow from "../../assets/rabbitRoom/environment-window.png";
import geneticWindow from "../../assets/rabbitRoom/genetic-window.png";
import stressWindow from "../../assets/rabbitRoom/stress-window.png";
import foodWindow from "../../assets/rabbitRoom/food-window.png";
import clinicNotice1 from "../../assets/rabbitRoom/clinic-notice-1.png";
import clinicNotice2 from "../../assets/rabbitRoom/clinic-notice-2.png";
import clinicNotice3 from "../../assets/rabbitRoom/clinic-notice-3.png";

const RabbitOtherFactor = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [showFinalSequence, setShowFinalSequence] = useState(false);

  const folders = [
    {
      id: "equipment",
      img: equipmentFolder,
      window: equipmentWindow,
      class: "pos-equipment",
    },
    {
      id: "genetic",
      img: geneticFolder,
      window: geneticWindow,
      class: "pos-genetic",
    },
    {
      id: "stress",
      img: stressFolder,
      window: stressWindow,
      class: "pos-stress",
    },
    {
      id: "environment",
      img: environmentFolder,
      window: environmentWindow,
      class: "pos-environment",
    },
    { id: "food", img: foodFolder, window: foodWindow, class: "pos-food" },
  ];

  const closePopup = () => setActivePopup(null);

  const handleNextClick = () => {
    setShowFinalSequence(true);
  };

  const goToClinic = () => {
    navigate("map");
  };

  return (
    <motion.div
      className="factor-container-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backgroundColor:
          activePopup || showFinalSequence ? "#906e70" : "#b48b8d",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="rabbit-responsive-container">
        <img src={bgOtherFactor} className="factor-bg-img" alt="bg" />

        {/* Render Folders */}
        {folders.map((folder) => (
          <motion.div
            key={folder.id}
            className={`folder-wrapper ${folder.class}`}
            onClick={() => setActivePopup(folder.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            <img
              src={folder.img}
              className="folder-img-asset"
              alt={folder.id}
            />
          </motion.div>
        ))}

        {/* Next Button */}
        <AnimatePresence>
          {!showFinalSequence && (
            <motion.img
              src={nextArrow}
              className="next-btn-trigger"
              onClick={handleNextClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            />
          )}
        </AnimatePresence>

        {/* Popup Overlay */}
        <AnimatePresence>
          {activePopup && (
            <motion.div
              className="rabbit-popup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="popup-content-wrapper"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={folders.find((f) => f.id === activePopup)?.window}
                  className="window-img-asset"
                  alt="popup"
                />
                <div className="close-x-trigger" onClick={closePopup} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Sequence Popups */}
        <AnimatePresence>
          {showFinalSequence && (
            <div className="final-sequence-overlay">
              <motion.div
                className="final-popup pos-1"
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <img
                  src={clinicNotice1}
                  alt="notice 1"
                  className="final-window-img"
                />
                <div className="final-btn-snooze" onClick={goToClinic} />
                <div className="final-btn-clinic" onClick={goToClinic} />
              </motion.div>

              <motion.div
                className="final-popup pos-2"
                initial={{ scale: 0, opacity: 0, x: -50 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <img
                  src={clinicNotice2}
                  alt="notice 2"
                  className="final-window-img"
                />
                <div className="final-btn-snooze" onClick={goToClinic} />
                <div className="final-btn-clinic" onClick={goToClinic} />
              </motion.div>

              <motion.div
                className="final-popup pos-3"
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <img
                  src={clinicNotice3}
                  alt="notice 3"
                  className="final-window-img"
                />
                <div className="final-btn-snooze" onClick={goToClinic} />
                <div className="final-btn-clinic" onClick={goToClinic} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Outlet />
      </div>
    </motion.div>
  );
};

export default RabbitOtherFactor;