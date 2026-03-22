import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./StartPage.css";

// Import Assets
import startBg from "../../assets/startPage/start-background.png";
import nextArrow from "../../assets/startPage/next-arrow.png";
import poleImg from "../../assets/startPage/pole.png";
import houseImg from "../../assets/startPage/house.png";

// Import Sign Images
import medicalSign from "../../assets/startPage/medical-sign.png";
import foodSign from "../../assets/startPage/food-sign.png";
import equipSign from "../../assets/startPage/equipment-sign.png";
import othersSign from "../../assets/startPage/others-sign.png";

// Import Window Images
import medicalWin from "../../assets/startPage/medical-window.png";
import foodWin from "../../assets/startPage/food-window.png";
import equipWin from "../../assets/startPage/equipment-window.png";
import othersWin from "../../assets/startPage/others-window.png";

const StartPage = () => {
  const [isHouseMode, setIsHouseMode] = useState(false);
  const [showMedical, setShowMedical] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showEquip, setShowEquip] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  const handleNextPage = () => {
    setShowMedical(false);
    setShowFood(false);
    setShowEquip(false);
    setShowOthers(false);
    setIsHouseMode(true);
  };

  return (
    <div className="start-page-container">
      <div className="start-page-wrapper">
        <img src={startBg} alt="Background" className="bg-img-base" />

        <motion.div
          className="signpost-container"
          animate={{ x: isHouseMode ? "-26vw" : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img src={poleImg} alt="Pole" className="sign-pole" />
          <SignItem
            img={medicalSign}
            className="sign-medical"
            isHouseMode={isHouseMode}
            onClick={() => !isHouseMode && setShowMedical(true)}
          />
          <SignItem
            img={foodSign}
            className="sign-food"
            isHouseMode={isHouseMode}
            onClick={() => !isHouseMode && setShowFood(true)}
          />
          <SignItem
            img={equipSign}
            className="sign-equip"
            isHouseMode={isHouseMode}
            onClick={() => !isHouseMode && setShowEquip(true)}
          />
          <SignItem
            img={othersSign}
            className="sign-others"
            isHouseMode={isHouseMode}
            onClick={() => !isHouseMode && setShowOthers(true)}
          />
        </motion.div>

        <motion.div
          className="house-layer"
          initial={{ x: "100vw" }}
          animate={{
            x: isHouseMode ? 0 : "100vw",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img src={houseImg} alt="House" className="house-asset-img" />
        </motion.div>

        <AnimatePresence>
          {!isHouseMode && (
            <motion.img
              key="next-btn"
              src={nextArrow}
              className="next-btn-absolute"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={handleNextPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMedical && (
            <WindowItem
              key="medical"
              img={medicalWin}
              onClose={() => setShowMedical(false)}
              id="medical"
            />
          )}
          {showFood && (
            <WindowItem
              key="food"
              img={foodWin}
              onClose={() => setShowFood(false)}
              id="food"
            />
          )}
          {showEquip && (
            <WindowItem
              key="equip"
              img={equipWin}
              onClose={() => setShowEquip(false)}
              id="equip"
            />
          )}
          {showOthers && (
            <WindowItem
              key="others"
              img={othersWin}
              onClose={() => setShowOthers(false)}
              id="others"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SignItem = ({ img, className, onClick, isHouseMode }: any) => (
  <motion.img
    src={img}
    className={`sign-asset ${className}`}
    onClick={!isHouseMode ? onClick : undefined}
    style={{
      x: "-50%",
      y: "-50%",
      rotate: 0,
      cursor: isHouseMode ? "default" : "pointer",
      pointerEvents: isHouseMode ? "none" : "auto",
    }}
    whileHover={isHouseMode ? {} : { scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  />
);

const WindowItem = ({ img, onClose, id }: any) => (
  <motion.div
    className={`popup-window-absolute win-${id}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
  >
    <div className="win-content">
      <img src={img} alt="popup" />
      <button className="win-close-btn" onClick={onClose} />
    </div>
  </motion.div>
);

export default StartPage;