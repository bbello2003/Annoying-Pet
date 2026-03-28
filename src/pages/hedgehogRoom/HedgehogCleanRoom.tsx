import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./HedgehogCleanRoom.css";

import homeIcon from "../../assets/components/home-icon.png";
import homeCircle from "../../assets/components/home-circle-button.png";
import hedgehogGif from "../../assets/hedgehogRoom/hedgehog-gif.gif";

import bgClean from "../../assets/hedgehogRoom/bg-clean-room.png";
import step1 from "../../assets/hedgehogRoom/hedge-step-1.png";
import step2 from "../../assets/hedgehogRoom/hedge-step-2.png";
import step3 from "../../assets/hedgehogRoom/hedge-step-3.png";
import step4 from "../../assets/hedgehogRoom/hedge-step-4.png";
import step5 from "../../assets/hedgehogRoom/hedge-step-5.png";
import step6 from "../../assets/hedgehogRoom/hedge-step-6.png";
import step7 from "../../assets/hedgehogRoom/hedge-step-7.png";
import step8 from "../../assets/hedgehogRoom/hedge-step-8.png";
import step9 from "../../assets/hedgehogRoom/hedge-step-9.png";
import step10 from "../../assets/hedgehogRoom/hedge-step-10.png";
import step11 from "../../assets/hedgehogRoom/hedge-step-11.png";
import step12 from "../../assets/hedgehogRoom/hedge-step-12.png";
import step13 from "../../assets/hedgehogRoom/hedge-step-13.png";
import step14 from "../../assets/hedgehogRoom/hedge-step-14.png";

const steps = [
  { img: bgClean, hasButton: false, autoNext: true },
  { img: step1, hasButton: true, btnClass: "btn-hedge-1" },
  { img: step2, hasButton: false, autoNext: true },
  { img: step3, hasButton: true, btnClass: "btn-hedge-3" },
  { img: step4, hasButton: false, autoNext: true },
  { img: step5, hasButton: true, btnClass: "btn-hedge-5" },
  { img: step6, hasButton: false, autoNext: true },
  { img: step7, hasButton: true, btnClass: "btn-hedge-7" },
  { img: step8, hasButton: false, autoNext: true },
  { img: step9, hasButton: true, btnClass: "btn-hedge-9" },
  { img: step10, hasButton: false, autoNext: true },
  { img: step11, hasButton: true, btnClass: "btn-hedge-11" },
  { img: step12, hasButton: false, autoNext: true },
  { img: step13, hasButton: true, btnClass: "btn-hedge-13" },
  { img: step14, hasButton: false, showHomeCircle: true },
];

const HedgehogCleanRoom = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  const currentStep = steps[stepIndex];

  const triggerNext = () => {
    if (stepIndex < steps.length - 1) {
      setPrevIndex(stepIndex);
      setStepIndex((prev) => prev + 1);
    }
  };

  const getBgColor = () => {
    if (stepIndex === 1) return "#6b829e";
    if (stepIndex >= 2) return "#ffffff";
    return "#8caeda";
  };

  useEffect(() => {
    if (currentStep?.autoNext) {
      const timer = setTimeout(triggerNext, 1200);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, currentStep]);

  return (
    <motion.div
      className="hedgehog-clean-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: getBgColor() }}
      exit={{ opacity: 0 }}
    >
      <div className="hedgehog-clean-container">
        {/* Home Button */}
        <motion.button
          className="hedgehog-clean-home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <div className="hedgehog-clean-sequence-layer">
          {/* Background */}
          {prevIndex >= 0 && (
            <div className="hedgehog-clean-img-wrapper" style={{ zIndex: 1 }}>
              <img
                src={steps[prevIndex].img}
                className="hedgehog-clean-img-full"
                alt="prev"
              />
            </div>
          )}

          {/* New-Foreground */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={stepIndex}
              className="hedgehog-clean-img-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "linear" }}
              style={{ zIndex: 2 }}
            >
              <img
                src={currentStep.img}
                className="hedgehog-clean-img-full"
                alt={`step-${stepIndex}`}
              />

              {stepIndex === 14 && (
                <motion.div
                  className="hedgehog-final-char"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <img src={hedgehogGif} alt="Hedgehog Happy" />
                </motion.div>
              )}

              {currentStep.hasButton && (
                <div
                  className={`hedgehog-clean-invisible-btn ${currentStep.btnClass}`}
                  onClick={triggerNext}
                />
              )}

              {currentStep.showHomeCircle && (
                <motion.img
                  src={homeCircle}
                  className="hedgehog-clean-home-circle"
                  onClick={() => navigate("/lobby")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HedgehogCleanRoom;