import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./StartPage.css";

// Import Assets
import startBg from "../../assets/startPage/start-background.png";
import nextArrow from "../../assets/startPage/next-arrow.png";

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
  const [showMedical, setShowMedical] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showEquip, setShowEquip] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  const handleNextPage = () => {
    console.log("Slide to next page...");
  };

  return (
    <motion.div
      className="start-page-container"
      initial={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="start-page-wrapper">
        <img src={startBg} alt="Background" className="bg-img-base" />

        <div className="signpost-container">
          <SignItem
            img={medicalSign}
            className="sign-medical"
            rotation={0}
            onClick={() => setShowMedical(true)}
          />
          <SignItem
            img={foodSign}
            className="sign-food"
            rotation={0}
            onClick={() => setShowFood(true)}
          />
          <SignItem
            img={equipSign}
            className="sign-equip"
            rotation={0}
            onClick={() => setShowEquip(true)}
          />
          <SignItem
            img={othersSign}
            className="sign-others"
            rotation={0}
            onClick={() => setShowOthers(true)}
          />
        </div>

        {/* --- Windows (Popups) --- */}
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

        <motion.img
          src={nextArrow}
          className="next-btn-fixed"
          onClick={handleNextPage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </motion.div>
  );
};

const SignItem = ({
  img,
  className,
  onClick,
  rotation,
}: {
  img: string;
  className: string;
  onClick: () => void;
  rotation: number;
}) => (
  <motion.img
    src={img}
    className={`sign-asset ${className}`}
    onClick={onClick}
    style={{ x: "-50%", y: "-50%", rotate: rotation }}
    whileHover={{ scale: 1.05, filter: "brightness(1)" }}
    whileTap={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  />
);

const WindowItem = ({
  img,
  onClose,
  id,
}: {
  img: string;
  onClose: () => void;
  id: string;
}) => (
  <motion.div
    className={`popup-window-absolute win-${id}`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
  >
    <div className="win-content">
      <img src={img} alt="popup" />
      <button className="win-close-btn" onClick={onClose} />
    </div>
  </motion.div>
);

export default StartPage;