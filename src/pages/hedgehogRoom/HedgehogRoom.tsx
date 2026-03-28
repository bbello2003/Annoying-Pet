import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./HedgehogRoom.css";

import bgAdoptPage from "../../assets/hedgehogRoom/hedgehog-background.png";
import bgBathroom from "../../assets/hedgehogRoom/bg-bathroom.png";
import homeIcon from "../../assets/components/home-icon.png";
import adoptBtnImg from "../../assets/components/adopt-button.png";
import notiImg from "../../assets/hedgehogRoom/too-high-humidity-warning.png";
import hedgehogMain from "../../assets/hedgehogRoom/hedgehog.png";
import cleanHomeBtn from "../../assets/hedgehogRoom/clean-home-button.png";

import humidity0 from "../../assets/hedgehogRoom/humidity-main.png";
import humidity10 from "../../assets/hedgehogRoom/humidity-10.png";
import humidity20 from "../../assets/hedgehogRoom/humidity-20.png";
import humidity30 from "../../assets/hedgehogRoom/humidity-30.png";
import humidity40 from "../../assets/hedgehogRoom/humidity-40.png";
import humidity50 from "../../assets/hedgehogRoom/humidity-50.png";
import humidity60 from "../../assets/hedgehogRoom/humidity-60.png";
import humidity70 from "../../assets/hedgehogRoom/humidity-70.png";

const humidityImages: Record<number, string> = {
  0: humidity0,
  10: humidity10,
  20: humidity20,
  30: humidity30,
  40: humidity40,
  50: humidity50,
  60: humidity60,
  70: humidity70,
};

const HedgehogRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showHumidity, setShowHumidity] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const [prevHumidity, setPrevHumidity] = useState<number | null>(null);

  const handleAdopt = () => {
    setIsAdopted(true);
    setShowRoom(true);
    setTimeout(() => setShowNoti(true), 1500);
  };

  const handleConfirmNoti = () => {
    setShowNoti(false);
    setShowRoom(false);
    setShowHumidity(true);
  };

  const handleIncrease = () => {
    if (humidity < 70) {
      setPrevHumidity(humidity);
      setHumidity((prev) => prev + 10);
    }
  };

  const handleDecrease = () => {
    if (humidity > 0) {
      setPrevHumidity(humidity);
      setHumidity((prev) => prev - 10);
    }
  };

  const getBgColor = () => {
    if (showHumidity) return "#8caeda";
    if (showNoti) return "#536783";
    if (showRoom) return "#8caeda";
    return "#6b829e";
  };

  return (
    <motion.div
      className="hedgehog-room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: getBgColor() }}
    >
      <div className="hedgehog-responsive-container">
        {/* Home Button */}
        <motion.button
          className="hedgehog-home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        {/* Clean Home Button */}
        {showHumidity && (
          <motion.div
            className="hedgehog-clean-home-wrapper"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => navigate("/clean-home")}
          >
            <img
              src={cleanHomeBtn}
              alt="Clean Home"
              className="hedgehog-clean-btn-img"
            />
          </motion.div>
        )}

        {/* Background & Hedgehog Layer */}
        <AnimatePresence>
          {showRoom && !showHumidity && (
            <motion.div
              className="hedgehog-bg-layer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={bgBathroom} className="hedgehog-img-full" alt="bg" />

              <motion.div
                className="hedgehog-char-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <img
                  src={hedgehogMain}
                  className="hedgehog-char-img"
                  alt="Hedgehog"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Humidity Sequence Layer */}
        {showHumidity && (
          <div className="hedgehog-humidity-layer">
            {prevHumidity !== null && (
              <div className="hedgehog-img-wrapper" style={{ zIndex: 1 }}>
                <img
                  src={humidityImages[prevHumidity]}
                  className="hedgehog-img-full"
                  alt="prev-humidity"
                />
              </div>
            )}

            <AnimatePresence mode="popLayout">
              <motion.div
                key={humidity}
                className="hedgehog-img-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "linear" }}
                style={{ zIndex: 2 }}
              >
                <img
                  src={humidityImages[humidity]}
                  className="hedgehog-img-full"
                  alt={`humidity-${humidity}`}
                />

                <div className="humidity-controls-trigger">
                  <div className="btn-up" onClick={handleIncrease} />
                  <div className="btn-down" onClick={handleDecrease} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Adopt Overlay */}
        <AnimatePresence>
          {!isAdopted && (
            <motion.div
              className="hedgehog-adopt-overlay"
              exit={{ opacity: 0 }}
            >
              <img
                src={bgAdoptPage}
                className="hedgehog-img-full"
                alt="adopt page"
              />
              <motion.img
                src={adoptBtnImg}
                className="hedgehog-adopt-btn-pos"
                onClick={handleAdopt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                alt="adopt button"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Noti Modal */}
        <AnimatePresence>
          {showNoti && (
            <motion.div
              className="hedgehog-noti-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="hedgehog-noti-content">
                <motion.img
                  src={notiImg}
                  className="hedgehog-img-full"
                  alt="notification"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                />

                <div
                  className="hedgehog-noti-btn-trigger"
                  onClick={handleConfirmNoti}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HedgehogRoom;
