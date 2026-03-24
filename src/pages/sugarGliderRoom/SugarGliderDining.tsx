import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SugarGliderDining.css";

// Assets
import diningBg from "../../assets/sugarGliderRoom/sugarGlider-dining-background.png";
import homeIcon from "../../assets/components/home-icon.png";
import sugarDefaultImg from "../../assets/sugarGliderRoom/sugar-dining-default.png";
import sugarAngryImg from "../../assets/sugarGliderRoom/sugar-dining-angry.png";
import angryOpinionImg from "../../assets/sugarGliderRoom/angry-opinion.png";
import dirtImg from "../../assets/sugarGliderRoom/dirt.png";
import plateImg from "../../assets/sugarGliderRoom/plate.png";
import diningTableImg from "../../assets/sugarGliderRoom/dining-table.png";
import gameOverWindowImg from "../../assets/sugarGliderRoom/game-over-window.png";
import retryBtnImg from "../../assets/sugarGliderRoom/retry-button.png";
import nextBtnImg from "../../assets/sugarGliderRoom/next-button.png";

// Food Assets
import eggImg from "../../assets/sugarGliderRoom/egg.png";
import corianderImg from "../../assets/sugarGliderRoom/coriander.png";
import carrotImg from "../../assets/sugarGliderRoom/carrot.png";
import blueberryImg from "../../assets/sugarGliderRoom/blueberry.png";
import tomatoImg from "../../assets/sugarGliderRoom/tomato.png";
import pelletedFoodImg from "../../assets/sugarGliderRoom/pelleted-food.png";
import appleImg from "../../assets/sugarGliderRoom/apple.png";
import insectImg from "../../assets/sugarGliderRoom/insect.png";
import broccoliImg from "../../assets/sugarGliderRoom/broccoli.png";

const foodMap: { [key: string]: string } = {
  egg: eggImg,
  coriander: corianderImg,
  carrot: carrotImg,
  blueberry: blueberryImg,
  tomato: tomatoImg,
  pelleted: pelletedFoodImg,
  apple: appleImg,
  insect: insectImg,
  broccoli: broccoliImg,
};

const foodConfigs: {
  [key: string]: { plateStyle: { width: string; top: string; left: string }[] };
} = {
  egg: {
    plateStyle: [
      { width: "12vw", top: "-100%", left: "5%" },
      { width: "12vw", top: "-100%", left: "28%" },
      { width: "12vw", top: "-100%", left: "50%" },
    ],
  },
  coriander: {
    plateStyle: [
      { width: "9vw", top: "-170%", left: "5%" },
      { width: "9vw", top: "-170%", left: "35%" },
      { width: "9vw", top: "-170%", left: "64%" },
    ],
  },
  carrot: {
    plateStyle: [
      { width: "11vw", top: "-100%", left: "5%" },
      { width: "11vw", top: "-100%", left: "35%" },
      { width: "11vw", top: "-100%", left: "56%" },
    ],
  },
  blueberry: {
    plateStyle: [
      { width: "10vw", top: "-100%", left: "6%" },
      { width: "10vw", top: "-100%", left: "32%" },
      { width: "10vw", top: "-100%", left: "56%" },
    ],
  },
  tomato: {
    plateStyle: [
      { width: "9vw", top: "-130%", left: "6%" },
      { width: "9vw", top: "-130%", left: "33%" },
      { width: "9vw", top: "-130%", left: "60%" },
    ],
  },
  pelleted: {
    plateStyle: [
      { width: "8vw", top: "-170%", left: "8%" },
      { width: "8vw", top: "-170%", left: "33%" },
      { width: "8vw", top: "-170%", left: "65%" },
    ],
  },
  apple: {
    plateStyle: [
      { width: "10vw", top: "-130%", left: "6%" },
      { width: "10vw", top: "-130%", left: "33%" },
      { width: "10vw", top: "-130%", left: "60%" },
    ],
  },
  insect: {
    plateStyle: [
      { width: "9vw", top: "-120%", left: "6%" },
      { width: "9vw", top: "-120%", left: "33%" },
      { width: "9vw", top: "-120%", left: "60%" },
    ],
  },
  broccoli: {
    plateStyle: [
      { width: "9.5vw", top: "-140%", left: "6%" },
      { width: "9.5vw", top: "-140%", left: "33%" },
      { width: "9.5vw", top: "-140%", left: "60%" },
    ],
  },
};

const SugarGliderDining = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showFood, setShowFood] = useState(true);
  const [showDirt, setShowDirt] = useState(false);
  const [phase, setPhase] = useState("falling");

  const [selectedFoods] = useState<string[]>(
    location.state?.selectedFoods || [],
  );

  useEffect(() => {
    if (phase === "falling") {
      const waitTime = 1500 + selectedFoods.length * 300;
      const timer1 = setTimeout(() => {
        setPhase("angry");
        setShowFood(false);
        setShowDirt(true);
      }, waitTime);
      return () => clearTimeout(timer1);
    }

    if (phase === "angry") {
      const timer2 = setTimeout(() => {
        setPhase("gameOver");
      }, 1800);
      return () => clearTimeout(timer2);
    }
  }, [phase, selectedFoods.length]);

  return (
    <motion.div
      className="dining-overlay-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="dining-wrapper">
        <img
          src={diningBg}
          className="dining-full-bg"
          alt="Dining Background"
        />

        {/* sugar glider */}
        <div className="sugar-glider-container">
          <motion.img
            src={
              phase === "angry" || phase === "gameOver"
                ? sugarAngryImg
                : sugarDefaultImg
            }
            className="sugar-glider-body"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <AnimatePresence>
            {phase === "angry" && (
              <motion.img
                src={angryOpinionImg}
                className="angry-bubble"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* dining table */}
        <img
          src={diningTableImg}
          className="dining-table-front"
          alt="Dining Table"
        />

        {/* dirt overlay */}
        <AnimatePresence>
          {showDirt && (
            <motion.img
              src={dirtImg}
              className="dirt-overlay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* plate group */}
        <motion.div
          className="plate-group"
          initial={false}
          animate={
            phase === "angry" || phase === "gameOver"
              ? { x: "-5%", y: "-60%", rotate: 180, opacity: 1 }
              : { x: "-50%", y: "-50%", opacity: 1 }
          }
          transition={{ duration: phase === "angry" ? 0.3 : 0, ease: "easeIn" }}
        >
          <img
            src={plateImg}
            className="main-plate"
            alt="Plate"
            style={{ position: "relative", zIndex: 20 }}
          />
          <AnimatePresence>
            {showFood &&
              selectedFoods.map((id, index) => {
                const config = foodConfigs[id];
                const style = config?.plateStyle[index] || {
                  width: "7vw",
                  top: "50%",
                  left: "50%",
                };
                return (
                  <motion.img
                    key={`${id}-${index}`}
                    src={foodMap[id]}
                    className="food-item"
                    style={{
                      position: "absolute",
                      width: style.width,
                      top: style.top,
                      left: style.left,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10 + index,
                    }}
                    initial={{ y: -300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.1 },
                    }}
                    transition={{
                      delay: index * 0.3,
                      type: "spring",
                      stiffness: 70,
                      damping: 12,
                    }}
                  />
                );
              })}
          </AnimatePresence>
        </motion.div>

        {/* Game Over Screen */}
        <AnimatePresence>
          {phase === "gameOver" && (
            <div className="game-over-screen">
              <motion.div
                className="game-over-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="game-over-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ zIndex: 1001 }}
              >
                <img
                  src={gameOverWindowImg}
                  className="game-over-window"
                  alt="Game Over"
                />
                <motion.button
                  className="retry-img-btn"
                  onClick={() => {
                    navigate("/lobby/sugar/food", {
                      state: { selectedFoods: [] },
                    });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                >
                  <img src={retryBtnImg} alt="Retry" />
                </motion.button>
                <motion.button
                  className="next-img-btn"
                  onClick={() => navigate("stats")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                >
                  <img src={nextBtnImg} alt="Next" />
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* home button */}
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default SugarGliderDining;
