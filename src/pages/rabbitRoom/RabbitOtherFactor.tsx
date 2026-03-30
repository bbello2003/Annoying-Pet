import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
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
import geneticElement from "../../assets/rabbitRoom/genetic-element.png";
import foodElement1 from "../../assets/rabbitRoom/food-element-1.png";
import foodElement2 from "../../assets/rabbitRoom/food-element-2.png";
import foodElement3 from "../../assets/rabbitRoom/food-element-3.png";
import stressElement1 from "../../assets/rabbitRoom/stress-element-1.png";
import stressElement2 from "../../assets/rabbitRoom/stress-element-2.png";

const RabbitOtherFactor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [showFinalSequence, setShowFinalSequence] = useState(false);
  const isMapPage = location.pathname.includes("map");
  const [foodIndex, setFoodIndex] = useState(0);
  const foodImages = [foodElement1, foodElement2, foodElement3];

  useEffect(() => {
    let interval: any;
    if (activePopup === "food") {
      setFoodIndex(0);
      interval = setInterval(() => {
        setFoodIndex((prev) => (prev + 1) % 3);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [activePopup]);

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

  const getBgColor = () => {
    if (isMapPage) return "#b48b8d";
    if (activePopup || showFinalSequence) return "#906e70";
    return "#b48b8d";
  };

  const handleNextClick = () => {
    setShowFinalSequence(true);
  };

  const goToClinic = () => {
    navigate("map");
  };

  const [popupStatus, setPopupStatus] = useState({
    pos1: { visible: true, delay: 0.4 },
    pos2: { visible: true, delay: 0.9 },
    pos3: { visible: true, delay: 1.4 },
  });

  const handleSingleSnooze = (pos: "pos1" | "pos2" | "pos3") => {
    setPopupStatus((prev) => ({
      ...prev,
      [pos]: { visible: false, delay: 0.1 },
    }));

    setTimeout(() => {
      setPopupStatus((prev) => ({
        ...prev,
        [pos]: { ...prev[pos], visible: true },
      }));
    }, 300);
  };

  const renderSpecialContent = () => {
    switch (activePopup) {
      case "genetic":
        return (
          <div className="special-overlay genetic-area">
            <motion.img
              src={geneticElement}
              className="genetic-scroll-img"
              animate={{ y: ["0%", "-39%", "-39%", "0%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.7, 1],
              }}
            />
          </div>
        );
      case "food":
        return (
          <div className="special-overlay food-area">
            <motion.img
              key={foodIndex}
              src={foodImages[foodIndex]}
              className="food-anim-img"
              transition={{ duration: 0 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            />
          </div>
        );
      case "stress":
        return (
          <div className="special-overlay stress-area">
            <img src={stressElement2} className="stress-back-img" />
            <motion.img
              src={stressElement1}
              className="stress-front-img"
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.3, 1],
                ease: "easeInOut",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="factor-container-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backgroundColor: getBgColor(),
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="rabbit-responsive-container">
        {!isMapPage && (
          <>
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
                  onClick={closePopup}
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

                    {renderSpecialContent()}

                    <div className="close-x-trigger" onClick={closePopup} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final Sequence Popups */}
            <AnimatePresence>
              {showFinalSequence && (
                <div className="final-sequence-overlay">
                  <AnimatePresence mode="wait">
                    {popupStatus.pos1.visible && (
                      <motion.div
                        key="pos1"
                        className="final-popup pos-1"
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{ delay: popupStatus.pos1.delay }}
                      >
                        <img
                          src={clinicNotice1}
                          className="final-window-img"
                          alt="1"
                        />
                        <div
                          className="final-btn-snooze"
                          onClick={() => handleSingleSnooze("pos1")}
                        />
                        <div
                          className="final-btn-clinic"
                          onClick={goToClinic}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {popupStatus.pos2.visible && (
                      <motion.div
                        key="pos2"
                        className="final-popup pos-2"
                        initial={{ scale: 0, opacity: 0, x: -50 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0, opacity: 0, x: -20 }}
                        transition={{ delay: popupStatus.pos2.delay }}
                      >
                        <img
                          src={clinicNotice2}
                          className="final-window-img"
                          alt="2"
                        />
                        <div
                          className="final-btn-snooze"
                          onClick={() => handleSingleSnooze("pos2")}
                        />
                        <div
                          className="final-btn-clinic"
                          onClick={goToClinic}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {popupStatus.pos3.visible && (
                      <motion.div
                        key="pos3"
                        className="final-popup pos-3"
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{ delay: popupStatus.pos3.delay }}
                      >
                        <img
                          src={clinicNotice3}
                          className="final-window-img"
                          alt="3"
                        />
                        <div
                          className="final-btn-snooze"
                          onClick={() => handleSingleSnooze("pos3")}
                        />
                        <div
                          className="final-btn-clinic"
                          onClick={goToClinic}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </>
        )}

        <Outlet />
      </div>
    </motion.div>
  );
};

export default RabbitOtherFactor;