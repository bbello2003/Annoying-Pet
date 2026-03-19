import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroPage.css";
import StartPage from "../startPage/StartPage.tsx";

import introBg from "../../assets/introPage/intro-background.png";
import introFirstWindow from "../../assets/introPage/intro-first-window.png";
import scrollTrack from "../../assets/introPage/scrollbar.png";
import scrollThumbIcon from "../../assets/introPage/scroll.png";

import hamsterDef from "../../assets/introPage/hamster-default.png";
import hamsterAct from "../../assets/introPage/hamster-playing.png";
import rabbitDef from "../../assets/introPage/rabbit-default.png";
import rabbitAct from "../../assets/introPage/rabbit-sick.png";
import squirrelDef from "../../assets/introPage/squirrel-default.png";
import squirrelAct from "../../assets/introPage/squirrel-exercise.png";
import sugarDef from "../../assets/introPage/sugarGrider-default.png";
import sugarAct from "../../assets/introPage/sugerGlider-food.png";
import hedgeDef from "../../assets/introPage/hedgehog-default.png";
import hedgeAct from "../../assets/introPage/headgehog-dirty.png";

import alert1 from "../../assets/introPage/alert-window-1.png";
import alert2 from "../../assets/introPage/alert-window-2.png";
import alert3 from "../../assets/introPage/alert-window-3.png";
import alert4 from "../../assets/introPage/alert-window-4.png";
import alert5 from "../../assets/introPage/alert-window-5.png";
import alertError from "../../assets/introPage/alert-window-error.png";

const ERROR_WINDOWS_CONFIG = [
  {
    id: 1,
    src: alert1,
    top: "62.5%",
    left: "52.5%",
    width: "45vw",
    btn: { t: "5%", r: "3.5%", s: "6%" },
  },
  {
    id: 2,
    src: alert2,
    top: "46%",
    left: "2%",
    width: "37.5vw",
    btn: { t: "4.8%", r: "4.2%", s: "7%" },
  },
  {
    id: 3,
    src: alertError,
    top: "11.5%",
    left: "4%",
    width: "29vw",
    btn: { t: "5%", r: "5%", s: "9%" },
  },
  {
    id: 4,
    src: alert3,
    top: "61.5%",
    left: "14.3%",
    width: "33.2vw",
    btn: { t: "5%", r: "5%", s: "8%" },
  },
  {
    id: 5,
    src: alertError,
    top: "42.3%",
    left: "63.6%",
    width: "29vw",
    btn: { t: "5.2%", r: "5%", s: "9%" },
  },
  {
    id: 6,
    src: alert4,
    top: "5.4%",
    left: "52.5%",
    width: "43.5vw",
    btn: { t: "4.5%", r: "3.5%", s: "6%" },
  },
  {
    id: 7,
    src: alert5,
    top: "3.5%",
    left: "15%",
    width: "32.5vw",
    btn: { t: "4%", r: "5%", s: "8%" },
  },
];

const BACK_PETS = [
  {
    id: "hamster",
    def: hamsterDef,
    act: hamsterAct,
    top: "35.5%",
    left: "92%",
    size: "17vw",
  },
];

const FRONT_PETS = [
  {
    id: "rabbit",
    def: rabbitDef,
    act: rabbitAct,
    top: "36%",
    left: "8.1%",
    size: "7vw",
    flip: true,
  },
  {
    id: "squirrel",
    def: squirrelDef,
    act: squirrelAct,
    top: "42.3%",
    left: "71.5%",
    size: "13vw",
  },
  {
    id: "sugar",
    def: sugarDef,
    act: sugarAct,
    top: "42.4%",
    left: "16%",
    size: "18vw",
  },
  {
    id: "hedge",
    def: hedgeDef,
    act: hedgeAct,
    top: "4%",
    left: "22%",
    size: "13vw",
  },
];

const IntroPage = () => {
  const [hoveredPet, setHoveredPet] = useState<string | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [activeErrorIndex, setActiveErrorIndex] = useState(-1);
  const [closedIds, setClosedIds] = useState<number[]>([]);
  const [isStartPage, setIsStartPage] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const THUMB_HEIGHT_VH = 20;
  const ARROW_OFFSET_VH = 4.5;

  const allPopupsClosed = closedIds.length === ERROR_WINDOWS_CONFIG.length;

  const handleScroll = useCallback(() => {
    if (isLocked) return;
    if (containerRef.current && !isDragging) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const totalScrollable = scrollHeight - clientHeight;
      const currentPercent =
        totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      setScrollPercent(currentPercent);
      if (currentPercent >= 0.99) {
        setScrollPercent(1);
        setIsLocked(true);
      }
    }
  }, [isDragging, isLocked]);

  useEffect(() => {
    if (isLocked && activeErrorIndex < ERROR_WINDOWS_CONFIG.length - 1) {
      const timer = setTimeout(() => {
        setActiveErrorIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLocked, activeErrorIndex]);

  const handleCloseOne = (id: number) => {
    setClosedIds((prev) => [...prev, id]);
  };

  const handleCloseLastWindow = () => {
    setIsStartPage(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isLocked || !isDragging || !trackRef.current || !containerRef.current)
        return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const arrowPx = (ARROW_OFFSET_VH / 100) * window.innerHeight;
      const thumbPx = (THUMB_HEIGHT_VH / 100) * window.innerHeight;
      const availableTrack = trackRect.height - arrowPx * 2 - thumbPx;
      let relativeY = e.clientY - trackRect.top - arrowPx - thumbPx / 2;
      relativeY = Math.max(0, Math.min(relativeY, availableTrack));
      const newRatio = relativeY / availableTrack;
      containerRef.current.scrollTop =
        newRatio *
        (containerRef.current.scrollHeight - containerRef.current.clientHeight);
      setScrollPercent(newRatio);
      if (newRatio >= 0.99) {
        setIsLocked(true);
        setIsDragging(false);
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isLocked]);

  const renderPet = (pet: any) => (
    <div
      key={pet.id}
      className="pet-item"
      style={{
        top: pet.top,
        left: pet.left,
        transform: `translate(-50%, -50%) ${pet.flip ? "scaleX(-1)" : ""}`,
      }}
      onMouseEnter={() => setHoveredPet(pet.id)}
      onMouseLeave={() => setHoveredPet(null)}
    >
      <motion.img
        src={hoveredPet === pet.id ? pet.act : pet.def}
        alt={pet.id}
        style={{ width: pet.size }}
      />
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#33a681",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
        }}
      >
        <StartPage />
      </div>

      <AnimatePresence mode="wait">
        {!isStartPage && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2,
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div
              className={`intro-container ${isLocked ? "locked" : ""}`}
              ref={containerRef}
              onScroll={handleScroll}
            >
              <div className="background-wrapper">
                <img src={introBg} className="full-bg" alt="background" />

                <div className="pets-layer back-layer">
                  {BACK_PETS.map(renderPet)}
                </div>

                <div className="game-window-layer">
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      src={introFirstWindow}
                      className="game-window-img"
                      alt="First Window"
                    />

                    {allPopupsClosed && (
                      <div
                        className="close-btn last-window-btn"
                        onClick={handleCloseLastWindow}
                        style={{
                          position: "absolute",
                          top: "161.5%",
                          right: "14.5%",
                          width: "3.7%",
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          zIndex: 1000,
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="pets-layer front-layer">
                  {FRONT_PETS.map(renderPet)}
                </div>
              </div>

              <AnimatePresence>
                {isLocked &&
                  ERROR_WINDOWS_CONFIG.map((err, index) => {
                    if (
                      index <= activeErrorIndex &&
                      !closedIds.includes(err.id)
                    ) {
                      return (
                        <motion.div
                          key={err.id}
                          className="error-window-item"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          style={{
                            top: err.top,
                            left: err.left,
                            width: err.width,
                            zIndex: 100 + index,
                          }}
                        >
                          <img
                            src={err.src}
                            className="error-img"
                            alt="Error"
                          />

                          <div
                            className="close-btn"
                            onClick={() => handleCloseOne(err.id)}
                            style={{
                              top: err.btn?.t,
                              right: err.btn?.r,
                              width: err.btn?.s,
                              aspectRatio: "1 / 1",
                            }}
                          />
                        </motion.div>
                      );
                    }
                    return null;
                  })}
              </AnimatePresence>

              <div className="custom-scrollbar-wrapper">
                <div className="scrollbar-track-container" ref={trackRef}>
                  <img
                    src={scrollTrack}
                    className="scroll-track-img"
                    alt="track"
                  />

                  <motion.div
                    className="scroll-thumb-container"
                    onMouseDown={handleMouseDown}
                    style={{
                      top: `calc(${ARROW_OFFSET_VH}vh + (${scrollPercent} * (100% - ${
                        THUMB_HEIGHT_VH + ARROW_OFFSET_VH * 2
                      }vh)))`,
                    }}
                  >
                    <img
                      src={scrollThumbIcon}
                      className="scroll-thumb-img"
                      style={{ height: `${THUMB_HEIGHT_VH}vh` }}
                      alt="thumb"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;