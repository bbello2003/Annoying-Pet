import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./HamsterRoom.css";

import { playGlobalCashSound } from "../lobbyPage/LobbyPage";
import bgEmpty from "../../assets/hamsterRoom/bg-empty.png";
import bgAdoptPage from "../../assets/hamsterRoom/hamster-background.png";
import homeIcon from "../../assets/components/home-icon.png";
import adoptBtnImg from "../../assets/components/adopt-button.png";
import notiImg from "../../assets/hamsterRoom/noti-popup.png";
import hamsterMain from "../../assets/hamsterRoom/hamster.png";
import infoIcon from "../../assets/hamsterRoom/information-icon.png";
import priceWarningImg from "../../assets/hamsterRoom/information-window.png";
import gadgetTopic from "../../assets/hamsterRoom/gadget-topic-text.png";
import nextArrow from "../../assets/components/next-arrow.png";
import homeCircle from "../../assets/components/home-circle-button.png";
import cashGif from "../../assets/components/cash-gif.gif";

import step1 from "../../assets/hamsterRoom/ham-step-1.png";
import step2 from "../../assets/hamsterRoom/ham-step-2.png";
import step3 from "../../assets/hamsterRoom/ham-step-3.png";
import step4 from "../../assets/hamsterRoom/ham-step-4.png";
import step5 from "../../assets/hamsterRoom/ham-step-5.png";
import step6 from "../../assets/hamsterRoom/ham-step-6.png";
import step7 from "../../assets/hamsterRoom/ham-step-7.png";
import step8 from "../../assets/hamsterRoom/ham-step-8.png";
import step9 from "../../assets/hamsterRoom/ham-step-9.png";
import step10 from "../../assets/hamsterRoom/ham-step-10.png";
import step11 from "../../assets/hamsterRoom/ham-step-11.png";
import step12 from "../../assets/hamsterRoom/ham-step-12.png";
import step13 from "../../assets/hamsterRoom/ham-step-13.png";
import step14 from "../../assets/hamsterRoom/ham-step-14.png";
import step15 from "../../assets/hamsterRoom/ham-step-15.png";

const steps = [
  { img: step1, hasButton: true, btnClass: "btn-step-1" },
  { img: step2, hasButton: false, autoNext: true },
  { img: step3, hasButton: true, btnClass: "btn-step-3" },
  { img: step4, hasButton: false, autoNext: true },
  { img: step5, hasButton: true, btnClass: "btn-step-5" },
  { img: step6, hasButton: false, autoNext: true },
  { img: step7, hasButton: true, btnClass: "btn-step-7" },
  { img: step8, hasButton: false, autoNext: true },
  { img: step9, hasButton: true, btnClass: "btn-step-9" },
  { img: step10, hasButton: false, autoNext: true },
  { img: step11, hasButton: true, btnClass: "btn-step-11" },
  { img: step12, hasButton: false, autoNext: true },
  { img: step13, hasButton: true, btnClass: "btn-step-13" },
  { img: step14, hasButton: false, showNextArrow: true },
  { img: step15, hasButton: false, showHomeCircle: true },
];

interface CashEffect {
  id: number;
  x: number;
  y: number;
}

const HamsterRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [showTopic, setShowTopic] = useState(false);
  const [isHamsterRight, setIsHamsterRight] = useState(false);
  const [cashEffects, setCashEffects] = useState<CashEffect[]>([]);

  const currentStep = steps[stepIndex];

  const triggerNext = () => {
    if (stepIndex < steps.length - 1) {
      setPrevIndex(stepIndex);
      setStepIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (currentStep?.autoNext) {
      const timer = setTimeout(triggerNext, 1000);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, currentStep]);

  const handleAdopt = () => {
    setIsAdopted(true);
    setTimeout(() => setShowNoti(true), 1200);
  };

  const handleConfirmNoti = () => {
    setShowNoti(false);
    setIsHamsterRight(true);
    setShowTopic(true);
    setTimeout(() => setStepIndex(0), 1200);
  };

  const getBgColor = () => {
    if (stepIndex >= 1 && stepIndex < 14) return "#ffffff";
    if (stepIndex === 14) return "#b7b7b6";
    return "#948c83";
  };

  const spawnCash = (e: MouseEvent<HTMLElement>) => {
    const container = document.querySelector(".hamster-responsive-container");
    if (!container) return;

    playGlobalCashSound();

    const rect = container.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const id = Date.now();
    setCashEffects((prev) => [...prev, { id, x: xPercent, y: yPercent }]);

    setTimeout(() => {
      setCashEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 800);
  };

  const handleStepClick = (e: MouseEvent<HTMLElement>, index: number) => {
    if (index !== 13) spawnCash(e);
    triggerNext();
  };

  const handleBackToLobby = () => {
    localStorage.setItem("hamster_completed", "true");
    navigate("/lobby");
  };

  return (
    <motion.div
      className="hamster-room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: getBgColor() }}
    >
      <div className="hamster-responsive-container">
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>
        <div className="background-layer">
          <img src={bgEmpty} className="img-full" alt="bg" />
        </div>
        <AnimatePresence>
          {isAdopted && (
            <motion.button
              className="info-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => setShowPriceInfo(true)}
            >
              <img src={infoIcon} alt="Info" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showTopic && stepIndex < 14 && (
            <motion.div
              className="gadget-topic-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ zIndex: 15 }}
            >
              <img src={gadgetTopic} alt="Topic" className="img-full" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isAdopted && stepIndex <= 0 && (
            <motion.div
              className="main-char-container"
              initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "13%" }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isHamsterRight ? "86.5%" : "-50%",
                y: "13%",
              }}
              transition={{
                type: "spring",
                stiffness: isHamsterRight ? 100 : 400,
                damping: isHamsterRight ? 20 : 15,
              }}
            >
              <img src={hamsterMain} className="main-char-img" alt="Hamster" />
            </motion.div>
          )}
        </AnimatePresence>
        {isAdopted && stepIndex >= 0 && (
          <div className="sequence-layer">
            {prevIndex >= 0 && (
              <div className="img-full-wrapper" style={{ zIndex: 1 }}>
                <img
                  src={steps[prevIndex].img}
                  className="img-full"
                  alt="prev-step"
                />
              </div>
            )}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={stepIndex}
                className="img-full-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "linear" }}
                style={{ zIndex: 2 }}
              >
                <img
                  src={currentStep.img}
                  className="img-full"
                  alt={`step-${stepIndex}`}
                />
                {currentStep.hasButton && (
                  <div
                    className={`invisible-step-btn ${currentStep.btnClass}`}
                    onClick={(e) => handleStepClick(e, stepIndex)}
                  />
                )}
                {currentStep.showNextArrow && (
                  <motion.img
                    src={nextArrow}
                    className="next-arrow-btn"
                    onClick={(e) => handleStepClick(e, stepIndex)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                  />
                )}
                {currentStep.showHomeCircle && (
                  <motion.img
                    src={homeCircle}
                    className="home-circle-btn"
                    onClick={handleBackToLobby}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
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
          {!isAdopted && !showNoti && (
            <motion.div className="adopt-overlay" exit={{ opacity: 0 }}>
              <img src={bgAdoptPage} className="img-full" alt="adopt page" />
              <motion.img
                src={adoptBtnImg}
                className="adopt-btn-pos"
                onClick={handleAdopt}
                alt="adopt button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showNoti && (
            <motion.div
              className="noti-overlay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="noti-content">
                <img src={notiImg} className="img-full" alt="notification" />
                <div className="noti-btn-trigger" onClick={handleConfirmNoti} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showPriceInfo && (
            <motion.div
              className="price-info-overlay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="price-info-content">
                <img
                  src={priceWarningImg}
                  className="img-full"
                  alt="Price Warning"
                />
                <div
                  className="close-info-trigger"
                  onClick={() => setShowPriceInfo(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HamsterRoom;