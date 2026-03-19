import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import "./IntroPage.css";

// Assets Imports
import introBg from "../../assets/introPage/intro-background.png";
import introFirstWindow from "../../assets/introPage/intro-first-window.png";
import scrollTrack from "../../assets/introPage/scrollbar.png";
import scrollThumbIcon from "../../assets/introPage/scroll.png";

// Pet Assets
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const THUMB_HEIGHT_VH = 20;
  const ARROW_OFFSET_VH = 4.5;

  const handleScroll = useCallback(() => {
    if (containerRef.current && !isDragging) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const totalScrollable = scrollHeight - clientHeight;
      setScrollPercent(totalScrollable > 0 ? scrollTop / totalScrollable : 0);
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || !containerRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      // คำนวณหาตำแหน่งเมาส์เทียบกับความสูงราง (หักลบ Offset ลูกศรออก)
      const trackHeight = trackRect.height;
      const arrowPx = (ARROW_OFFSET_VH / 100) * window.innerHeight;
      const thumbPx = (THUMB_HEIGHT_VH / 100) * window.innerHeight;
      
      let relativeY = e.clientY - trackRect.top - arrowPx - (thumbPx / 2);
      const availableTrack = trackHeight - (arrowPx * 2) - thumbPx;

      // จำกัดขอบเขตไม่ให้ลากเลยราง
      relativeY = Math.max(0, Math.min(relativeY, availableTrack));
      const newRatio = relativeY / availableTrack;

      // อัปเดต Scroll ของ Container จริง
      const totalScrollable = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      containerRef.current.scrollTop = newRatio * totalScrollable;
      setScrollPercent(newRatio);
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
  }, [isDragging]);

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
    <div className="intro-container" ref={containerRef} onScroll={handleScroll}>
      <div className="background-wrapper">
        <img src={introBg} className="full-bg" alt="background" />
        <div className="pets-layer back-layer">{BACK_PETS.map(renderPet)}</div>
        <div className="game-window-layer">
          <img
            src={introFirstWindow}
            className="game-window-img"
            alt="First Window"
          />
        </div>
        <div className="pets-layer front-layer">
          {FRONT_PETS.map(renderPet)}
        </div>
      </div>

      <div className="custom-scrollbar-wrapper">
        {/* --- เพิ่ม ref={trackRef} ตรงบรรทัดนี้ --- */}
        <div className="scrollbar-track-container" ref={trackRef}>
          <img src={scrollTrack} className="scroll-track-img" alt="track" />
          
          <motion.div
            className="scroll-thumb-container"
            onMouseDown={handleMouseDown}
            style={{
              top: `calc(${ARROW_OFFSET_VH}vh + (${scrollPercent} * (100% - ${THUMB_HEIGHT_VH + ARROW_OFFSET_VH * 2}vh)))`,
              cursor: isDragging ? "grabbing" : "grab",
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
  );
};

export default IntroPage;