import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./RabbitRoom.css";

import homeIcon from "../../assets/components/home-icon.png";
import adoptBtnImg from "../../assets/components/adopt-button.png";
import clickIcon from "../../assets/components/click-icon.png";
import bgAdoptPage from "../../assets/rabbitRoom/rabbit-background.png";
import bgMain from "../../assets/rabbitRoom/bg-main.png";
import bgWindow from "../../assets/rabbitRoom/bg-window.png";
import bgRabbitPlayed from "../../assets/rabbitRoom/bg-rabbit-played.png";
import bgRabbitSick from "../../assets/rabbitRoom/bg-rabbit-sick.png";
import bgBlood100 from "../../assets/rabbitRoom/bg-blood-100.png";
import rabbitMain from "../../assets/rabbitRoom/rabbit.png";
import cupboardClose from "../../assets/rabbitRoom/cupboard-close.png";
import cupboardOpen from "../../assets/rabbitRoom/cupboard-open.png";
import topicMain from "../../assets/rabbitRoom/topic-main.png";
import windowImg from "../../assets/rabbitRoom/window.png";
import warningWindow from "../../assets/rabbitRoom/warning-window.png";
import rabbitHeal1 from "../../assets/rabbitRoom/rabbit-heal-1.png";
import syringeImg from "../../assets/rabbitRoom/syringe.png";
import nextFactorBtnImg from "../../assets/rabbitRoom/next-factor-button.png";
import blood20 from "../../assets/rabbitRoom/blood-20.png";
import blood40 from "../../assets/rabbitRoom/blood-40.png";
import blood60 from "../../assets/rabbitRoom/blood-60.png";
import blood80 from "../../assets/rabbitRoom/blood-80.png";
import cashGif from "../../assets/components/cash-gif.gif";
import moneySound from "../../assets/sounds/money-sound-effect.mp3";

interface CashEffect {
  id: number;
  x: number;
  y: number;
}

const RabbitRoom = () => {
  const navigate = useNavigate();

  const [isAdopted, setIsAdopted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWindowLayer, setShowWindowLayer] = useState(false);
  const [isWindowHovered, setIsWindowHovered] = useState(false);
  const [isWindowDropped, setIsWindowDropped] = useState(false);
  const [showSickPage, setShowSickPage] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showHealPage, setShowHealPage] = useState(false);
  const [bloodLevel, setBloodLevel] = useState(20);
  const [isHealed, setIsHealed] = useState(false);
  const [cashEffects, setCashEffects] = useState<CashEffect[]>([]);

  const cashAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(moneySound);
    audio.preload = "auto";
    audio.load();
    cashAudioRef.current = audio;
  }, []);

  const handleAdopt = () => setIsAdopted(true);

  const playCashSound = () => {
    if (!cashAudioRef.current) return;

    const soundClone = cashAudioRef.current.cloneNode(true) as HTMLAudioElement;
    soundClone.volume = 0.5;

    const startTime = 1;
    const endTime = 2;
    soundClone.currentTime = startTime;

    const onTimeUpdate = () => {
      if (soundClone.currentTime >= endTime) {
        soundClone.pause();
        soundClone.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    soundClone.addEventListener("timeupdate", onTimeUpdate);
    soundClone.play().catch((err) => console.log("Audio play blocked", err));
  };

  const spawnCashAtSyringe = (info: any) => {
    const container = document.querySelector(".rabbit-responsive-container");
    if (!container) return;

    playCashSound();

    const rect = container.getBoundingClientRect();
    const xPercent = ((info.point.x - rect.left) / rect.width) * 100;
    const yPercent = ((info.point.y - rect.top) / rect.height) * 100;
    const id = Date.now();
    setCashEffects((prev) => [...prev, { id, x: xPercent, y: yPercent }]);
    setTimeout(() => {
      setCashEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 800);
  };

  const handleCarrotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWindowLayer(true);
  };

  const handleWindowTriggerClick = () => setIsWindowDropped(true);

  const handleNextStepClick = () => {
    setShowSickPage(true);
    setTimeout(() => setShowWarning(true), 1500);
  };

  const handleConfirmWarning = () => {
    setShowWarning(false);
    setShowHealPage(true);
  };

  const handleSyringeDragEnd = (_: any, info: any) => {
    if (info.offset.x >= 115 && bloodLevel < 100) {
      spawnCashAtSyringe(info);
      setBloodLevel((prev) => {
        if (prev === 20) return 40;
        if (prev === 40) return 60;
        if (prev === 60) return 80;
        if (prev === 80) {
          setIsHealed(true);
          return 100;
        }
        return 80;
      });
    }
  };

  const getBloodImg = () => {
    if (bloodLevel === 20) return blood20;
    if (bloodLevel === 40) return blood40;
    if (bloodLevel === 60) return blood60;
    return blood80;
  };

  return (
    <motion.div
      className="rabbit-room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="rabbit-responsive-container">
        <motion.button
          className="rabbit-home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <AnimatePresence mode="popLayout">
          {isAdopted && !showWindowLayer && (
            <motion.div
              key="main-room"
              className="rabbit-bg-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ zIndex: 10 }}
            >
              <img src={bgMain} className="rabbit-img-full" alt="bg-main" />
              <motion.div
                className="rabbit-char-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <img
                  src={rabbitMain}
                  className="rabbit-char-img"
                  alt="Rabbit"
                />
              </motion.div>
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
                {isHovered && (
                  <div
                    className="cupboard-carrot-trigger"
                    onClick={handleCarrotClick}
                  />
                )}
              </div>
              <div className="rabbit-topic-container">
                <img
                  src={topicMain}
                  className="rabbit-topic-img"
                  alt="Topic Health"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {showWindowLayer && (
            <motion.div
              key="window-layer"
              className="rabbit-window-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ zIndex: 100 }}
            >
              <img src={bgWindow} className="rabbit-img-full" alt="bg-window" />
              <motion.div
                className="rabbit-window-container"
                onMouseEnter={() =>
                  !isWindowDropped && setIsWindowHovered(true)
                }
                onMouseLeave={() => setIsWindowHovered(false)}
                onClick={handleWindowTriggerClick}
                animate={
                  isWindowDropped
                    ? { y: 1000, rotate: 20, opacity: 0 }
                    : { rotate: isWindowHovered ? -15 : 0 }
                }
                transition={
                  isWindowDropped
                    ? { duration: 0.7, ease: "easeIn" }
                    : { type: "spring", stiffness: 300, damping: 20 }
                }
              >
                <img
                  src={windowImg}
                  className="rabbit-window-img"
                  alt="Window"
                />
                <AnimatePresence>
                  {!isWindowHovered && !isWindowDropped && (
                    <motion.img
                      src={clickIcon}
                      className="window-click-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {isWindowDropped && (
                  <motion.div
                    className="played-layer-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    {" "}
                    <img
                      src={bgRabbitPlayed}
                      className="rabbit-img-full"
                      alt="Played"
                    />{" "}
                    <div
                      className="next-step-trigger"
                      onClick={handleNextStepClick}
                    />{" "}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showSickPage && (
                  <motion.div
                    className="sick-layer-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ zIndex: 140 }}
                  >
                    {" "}
                    <img
                      src={bgRabbitSick}
                      className="rabbit-img-full"
                      alt="Sick"
                    />{" "}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    className="warning-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ zIndex: 150 }}
                  >
                    {" "}
                    <motion.div
                      className="warning-container"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 300,
                      }}
                    >
                      {" "}
                      <img
                        src={warningWindow}
                        className="warning-img"
                        alt="Warning"
                      />{" "}
                      <div
                        className="warning-confirm-btn"
                        onClick={handleConfirmWarning}
                      />{" "}
                    </motion.div>{" "}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showHealPage && (
                  <motion.div
                    className="heal-layer-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ zIndex: 160 }}
                  >
                    {" "}
                    <div
                      className="rabbit-img-full"
                      style={{ position: "relative" }}
                    >
                      {" "}
                      <img
                        src={rabbitHeal1}
                        className="rabbit-img-full"
                        alt="Heal Base"
                      />{" "}
                      <div className="blood-bar-container">
                        {" "}
                        <img
                          src={getBloodImg()}
                          className="blood-bar-img"
                          alt="Blood Progress"
                        />{" "}
                      </div>{" "}
                      <motion.div
                        className="syringe-container"
                        drag="x"
                        dragConstraints={{ left: 0, right: 115 }}
                        dragElastic={0}
                        dragSnapToOrigin={true}
                        onDragEnd={handleSyringeDragEnd}
                        whileTap={{ scale: 1, cursor: "grabbing" }}
                        animate={{ opacity: isHealed ? 0 : 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        {" "}
                        <img
                          src={syringeImg}
                          className="syringe-img"
                          alt="Syringe"
                          draggable="false"
                        />{" "}
                      </motion.div>{" "}
                    </div>{" "}
                    <AnimatePresence>
                      {" "}
                      {isHealed && (
                        <motion.div
                          key="done-layer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 190,
                          }}
                        >
                          {" "}
                          <img
                            src={bgBlood100}
                            className="rabbit-img-full"
                            alt="Heal Done"
                          />{" "}
                          <motion.img
                            src={nextFactorBtnImg}
                            className="next-factor-btn-img"
                            onClick={() => navigate("factor")}
                            whileHover={{
                              scale: 1.05,
                              filter: "brightness(1.1)",
                            }}
                            whileTap={{ scale: 1 }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          />{" "}
                        </motion.div>
                      )}{" "}
                    </AnimatePresence>{" "}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {!isAdopted && (
            <motion.div
              key="adopt-overlay"
              className="rabbit-adopt-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ zIndex: 200 }}
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
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="cash-layer-fixed">
          {cashEffects.map((effect) => (
            <img
              key={effect.id}
              src={`${cashGif}?a=${effect.id}`}
              style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
              className="cash-gif-instance"
              alt="cash"
            />
          ))}
        </div>

        <Outlet />
      </div>
    </motion.div>
  );
};

export default RabbitRoom;