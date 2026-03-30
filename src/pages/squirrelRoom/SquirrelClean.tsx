import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SquirrelClean.css";

import cleanBg from "../../assets/squirrelRoom/clean-bg.png";
import allFixedBg from "../../assets/squirrelRoom/clean-all-fixed-background.png";
import weightLifting from "../../assets/squirrelRoom/weightlifting.png";
import weightLiftingMessed from "../../assets/squirrelRoom/weight-lifting-broke.png";
import shelfDumbell from "../../assets/squirrelRoom/shelf-dumbell-fixed.png";
import shelfDumbellMessed from "../../assets/squirrelRoom/shelf-dumbell-broke.png";
import ball from "../../assets/squirrelRoom/ball-fixed.png";
import ballMessed from "../../assets/squirrelRoom/ball-broke.png";
import catherBell from "../../assets/squirrelRoom/catherbell-fixed.png";
import catherBellMessed from "../../assets/squirrelRoom/catherbell-broke.png";
import dumbbell from "../../assets/squirrelRoom/dumbell-fixed.png";
import dumbbellMessed from "../../assets/squirrelRoom/dumbell-broke.png";
import squirrelDef from "../../assets/squirrelRoom/squirrel-default.png";
import topic1Text from "../../assets/squirrelRoom/clean-topic-text-1.png";
import topic2Text from "../../assets/squirrelRoom/clean-topic-text-2.png";
import homeCircleBtn from "../../assets/components/home-circle-button.png";
import cashGif from "../../assets/components/cash-gif.gif";
import moneySound from "../../assets/sounds/money-sound-effect.mp3";

interface CashEffect {
  id: number;
  x: number;
  y: number;
}

const SquirrelClean = () => {
  const navigate = useNavigate();
  const [textStep, setTextStep] = useState(0);
  const [cashEffects, setCashEffects] = useState<CashEffect[]>([]);

  const [repairs, setRepairs] = useState({
    weight: false,
    shelf: false,
    ball: false,
    kettle: false,
    dumbell: false,
  });

  const [showFinished, setShowFinished] = useState(false);

  const playCashSound = () => {
    const audio = new Audio(moneySound);
    audio.volume = 0.5;
    const startTime = 1;
    const endTime = 2;
    audio.currentTime = startTime;

    const onTimeUpdate = () => {
      if (audio.currentTime >= endTime) {
        audio.pause();
        audio.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.play().catch((err) => console.log("Audio play blocked", err));
  };

  const spawnCash = (e: MouseEvent<HTMLElement>) => {
    const container = document.querySelector(".clean-content-wrapper");
    if (!container) return;

    playCashSound();

    const rect = container.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const id = Date.now();
    setCashEffects((prev) => [...prev, { id, x: xPercent, y: yPercent }]);

    setTimeout(() => {
      setCashEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 800);
  };

  useEffect(() => {
    if (textStep === 0) {
      setTimeout(() => setTextStep(1), 1500);
    }
  }, [textStep]);

  const handleRepair = (
    e: MouseEvent<HTMLElement>,
    key: keyof typeof repairs,
  ) => {
    if (textStep < 1 || repairs[key]) return;

    spawnCash(e);
    setRepairs((prev) => ({ ...prev, [key]: true }));
  };

  const isAllFixed =
    repairs.weight &&
    repairs.shelf &&
    repairs.ball &&
    repairs.kettle &&
    repairs.dumbell;

  useEffect(() => {
    if (isAllFixed) {
      const timer = setTimeout(() => {
        setShowFinished(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAllFixed]);

  const handleBackToLobby = () => {
    localStorage.setItem("squirrel_completed", "true");
    navigate("/lobby");
  };

  return (
    <motion.div
      className={`clean-page-container ${showFinished ? "is-finished" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="clean-content-wrapper">
        <img
          src={showFinished ? allFixedBg : cleanBg}
          className="clean-main-bg"
          alt="bg"
        />

        <AnimatePresence>
          {!showFinished && (
            <motion.div
              key="messed-layer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* squirrel */}
              <img
                src={squirrelDef}
                className="clean-squirrel-pos"
                alt="squirrel-def"
              />

              <div
                className={`repair-item ${repairs.shelf ? "shelf-fixed" : "shelf-messed"}`}
                onClick={(e) => handleRepair(e, "shelf")}
              >
                <img
                  src={repairs.shelf ? shelfDumbell : shelfDumbellMessed}
                  alt="shelf"
                />
              </div>

              <div
                className={`repair-item ${repairs.ball ? "ball-fixed" : "ball-messed"}`}
                onClick={(e) => handleRepair(e, "ball")}
              >
                <img src={repairs.ball ? ball : ballMessed} alt="ball" />
              </div>

              <div
                className={`repair-item ${repairs.kettle ? "kettle-fixed" : "kettle-messed"}`}
                onClick={(e) => handleRepair(e, "kettle")}
              >
                <img
                  src={repairs.kettle ? catherBell : catherBellMessed}
                  alt="kettle"
                />
              </div>

              <div
                className={`repair-item ${repairs.dumbell ? "dumbell-fixed" : "dumbell-messed"}`}
                onClick={(e) => handleRepair(e, "dumbell")}
              >
                <img
                  src={repairs.dumbell ? dumbbell : dumbbellMessed}
                  alt="dumbell"
                />
              </div>

              <div
                className={`repair-item ${repairs.weight ? "weight-fixed" : "weight-messed"}`}
                onClick={(e) => handleRepair(e, "weight")}
              >
                <img
                  src={repairs.weight ? weightLifting : weightLiftingMessed}
                  alt="weight"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="cash-effect-layer">
          {cashEffects.map((effect) => (
            <img
              key={effect.id}
              src={`${cashGif}?a=${effect.id}`}
              style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
              className="cash-gif-instance"
              alt="cash-effect"
            />
          ))}
        </div>

        <AnimatePresence>
          {showFinished && (
            <motion.div
              key="fixed-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* home circle button */}
              <motion.div
                className="clean-home-circle-pos"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={handleBackToLobby}
              >
                <img src={homeCircleBtn} alt="Home" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* topics text */}
        <AnimatePresence>
          {!showFinished && (
            <motion.img
              key={textStep}
              src={textStep === 0 ? topic1Text : topic2Text}
              className="clean-topic-pos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SquirrelClean;