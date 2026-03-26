import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom";
import "./SquirrelBehavior.css";

import behaviorBg from "../../assets/squirrelRoom/behavior-background.png";
import nextBtn from "../../assets/components/next-arrow.png";

import folderDestruction from "../../assets/squirrelRoom/folder-destruction.png";
import folderSpace from "../../assets/squirrelRoom/folder-space.png";
import folderNoisy from "../../assets/squirrelRoom/folder-noisy.png";
import folderNightlife from "../../assets/squirrelRoom/folder-nightlife.png";

import popupDestruction from "../../assets/squirrelRoom/popup-destruction.png";
import popupSpace from "../../assets/squirrelRoom/popup-space.png";
import popupNoisy from "../../assets/squirrelRoom/popup-noisy.png";
import popupNightlife from "../../assets/squirrelRoom/popup-nightlife.png";

import destSquirrel1 from "../../assets/squirrelRoom/destruction-1.png";
import destSquirrel2 from "../../assets/squirrelRoom/destruction-2.png";
import spaceSquirrel1 from "../../assets/squirrelRoom/space-1.png";
import spaceSquirrel2 from "../../assets/squirrelRoom/space-2.png";
import noisySquirrel1 from "../../assets/squirrelRoom/noisy-1.png";
import noisySquirrel2 from "../../assets/squirrelRoom/noisy-2.png";
import nightSquirrel1 from "../../assets/squirrelRoom/nightlife-1.png";
import nightSquirrel2 from "../../assets/squirrelRoom/nightlife-2.png";

const SquirrelBehavior = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSquirrelIndex, setCurrentSquirrelIndex] = useState(0);

  const behaviorData = [
    {
      id: "destruction",
      img: folderDestruction,
      popupBg: popupDestruction,
      top: "15.8%",
      squirrels: [destSquirrel1, destSquirrel2],
    },
    {
      id: "space",
      img: folderSpace,
      popupBg: popupSpace,
      top: "35.2%",
      squirrels: [spaceSquirrel1, spaceSquirrel2],
    },
    {
      id: "noisy",
      img: folderNoisy,
      popupBg: popupNoisy,
      top: "54.5%",
      squirrels: [noisySquirrel1, noisySquirrel2],
    },
    {
      id: "nightlife",
      img: folderNightlife,
      popupBg: popupNightlife,
      top: "73.9%",
      squirrels: [nightSquirrel1, nightSquirrel2],
    },
  ];

  const currentPopupData = behaviorData.find((f) => f.id === activePopup);

  useEffect(() => {
    if (activePopup && currentPopupData) {
      setCurrentSquirrelIndex(0);
      const intervalId = setInterval(() => {
        setCurrentSquirrelIndex(
          (prevIndex) =>
            (prevIndex + 1) % (currentPopupData.squirrels.length || 1),
        );
      }, 500);
      return () => clearInterval(intervalId);
    }
  }, [activePopup, currentPopupData]);

  return (
    <motion.div
      className={`behavior-page-container ${activePopup ? "is-showing-popup" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="behavior-content-wrapper">
        <img src={behaviorBg} className="main-bg" alt="background" />

        {/* folder */}
        <div className="folder-list">
          {behaviorData.map((folder) => (
            <motion.img
              key={folder.id}
              src={folder.img}
              className="folder-item"
              style={{ top: folder.top }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => setActivePopup(folder.id)}
            />
          ))}
        </div>

        {/* next button */}
        <motion.img
          src={nextBtn}
          className="next-page-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          onClick={() => navigate("switch")}
        />

        {/* Overlay Popup System */}
        <AnimatePresence>
          {activePopup && (
            <motion.div
              className="popup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`popup-card ${activePopup}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentPopupData?.popupBg}
                  className="popup-bg-img"
                  alt="window frame"
                />

                <div className="squirrel-target-area">
                  <AnimatePresence>
                    <motion.img
                      key={currentSquirrelIndex}
                      src={currentPopupData?.squirrels?.[currentSquirrelIndex]}
                      className="animated-squirrel"
                      alt="squirrel animation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0 }}
                    />
                  </AnimatePresence>
                </div>

                <div
                  className="invisible-close-btn"
                  onClick={() => setActivePopup(null)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Outlet/>
      </div>
    </motion.div>
  );
};

export default SquirrelBehavior;