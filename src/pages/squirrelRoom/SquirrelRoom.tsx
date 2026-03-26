import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SquirrelRoom.css";

import bgFirstPage from "../../assets/squirrelRoom/squirrel-background.png";
import bgMainPage from "../../assets/squirrelRoom/squirrel-second-background.png";
import adoptBtn from "../../assets/components/adopt-button.png";
import homeIcon from "../../assets/components/home-icon.png";
import squirrelDef from "../../assets/squirrelRoom/squirrel-default.png";
import squirrelSmi from "../../assets/squirrelRoom/squirrel-smile.png";
import squirrelAng from "../../assets/squirrelRoom/squirrel-angry.png";
import weightLifting from "../../assets/squirrelRoom/weightlifting.png";
import clickIcon from "../../assets/squirrelRoom/click-icon.png";
import happyOpinion from "../../assets/squirrelRoom/today-happy-opinion.png";

import tailTopic from "../../assets/squirrelRoom/tail-topic-text.png";
import tailAngOp from "../../assets/squirrelRoom/dont-touch-tail-opinion.png";
import bellyTopic from "../../assets/squirrelRoom/belly-topic-text.png";
import bellyAngOp from "../../assets/squirrelRoom/dont-touch-belly-opinion.png";
import upsetTopic from "../../assets/squirrelRoom/upset-topic-text.png";
import headAngOp from "../../assets/squirrelRoom/dont-play-head-opinion.png";
import nextBtn from "../../assets/squirrelRoom/instinct-next-button.png";

const SquirrelRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAngry, setIsAngry] = useState(false);
  const [showInteraction, setShowInteraction] = useState(false);

  const handleAdopt = () => {
    setIsAdopted(true);
    setTimeout(() => {
      setCurrentStep(1);
      setShowInteraction(true);
    }, 1500);
  };

  const handleInteraction = () => {
    setIsAngry(true);
    setShowInteraction(false);

    if (currentStep < 3) {
      setTimeout(() => {
        setIsAngry(false);
        setCurrentStep((prev) => prev + 1);
        setShowInteraction(true);
      }, 1500);
    } else {
      setCurrentStep(4);
    }
  };

  const stepData: Record<
    number,
    { topic: string; opinion: string; posClass: string; topicClass: string }
  > = {
    1: {
      topic: tailTopic,
      opinion: tailAngOp,
      posClass: "click-tail-pos",
      topicClass: "tail-topic-size",
    },
    2: {
      topic: bellyTopic,
      opinion: bellyAngOp,
      posClass: "click-belly-pos",
      topicClass: "belly-topic-size",
    },
    3: {
      topic: upsetTopic,
      opinion: headAngOp,
      posClass: "click-head-pos",
      topicClass: "head-topic-size",
    },
  };

  const getSquirrelImg = () => {
    if (isAngry) return squirrelAng;
    if (currentStep === 4) return squirrelAng;
    if (currentStep === 1 && !isAngry) return squirrelSmi;
    if (currentStep > 1 && currentStep <= 3) return squirrelDef;
    return squirrelSmi;
  };

  return (
    <motion.div
      className="room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="squirrel-responsive-container">
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <div className="image-wrapper main-room-layer">
          <img src={bgMainPage} className="img-auto" alt="Room" />

          <div className="interaction-layer">
            <motion.img
              src={getSquirrelImg()}
              className="squirrel-still-pos"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isAdopted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.2,
              }}
            />

            {/* Opinion Logic */}
            <AnimatePresence>
              {isAdopted && (
                <motion.img
                  key={
                    currentStep === 0 || (currentStep === 1 && !isAngry)
                      ? "initial-happy"
                      : `step-${currentStep}-${isAngry}`
                  }
                  src={
                    isAngry || currentStep === 4
                      ? stepData[currentStep === 4 ? 3 : currentStep]?.opinion
                      : currentStep === 0 || currentStep === 1
                        ? happyOpinion
                        : undefined
                  }
                  className="happy-opinion-pos"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isAngry || currentStep <= 1 || currentStep === 4
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.1 },
                  }}
                  transition={
                    currentStep <= 1 && !isAngry
                      ? {
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          delay: 0.5,
                        }
                      : { duration: 0.2 }
                  }
                />
              )}
            </AnimatePresence>

            {/* Topic & Click Icon */}
            <AnimatePresence>
              {showInteraction && currentStep >= 1 && currentStep <= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1 },
                  }}
                >
                  <img
                    src={stepData[currentStep].topic}
                    className={`common-topic-pos ${stepData[currentStep].topicClass}`}
                    alt="Topic"
                  />
                  <motion.img
                    src={clickIcon}
                    className={`click-icon-pos ${stepData[currentStep].posClass}`}
                    onClick={handleInteraction}
                    whileTap={{ scale: 0.9 }}
                    style={{ cursor: "pointer" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {currentStep === 4 && (
              <motion.img
                src={nextBtn}
                className="next-btn-pos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={() => navigate("/next-page")}
              />
            )}

            <img
              src={weightLifting}
              className="weightlifting-pos"
              alt="Dumbbell"
            />
          </div>
        </div>

        {/* Adopt Layer */}
        <AnimatePresence>
          {!isAdopted && (
            <motion.div
              className="image-wrapper adopt-layer"
              exit={{ opacity: 0 }}
            >
              <img src={bgFirstPage} className="img-auto" />
              <motion.button
                className="adopt-btn-overlay"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={handleAdopt}
              >
                <img src={adoptBtn} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SquirrelRoom;