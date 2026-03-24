import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SugarGliderRoom.css";

// Import Assets
import bgImage from "../../assets/sugarGliderRoom/sugarGlider-background.png";
import topicImage from "../../assets/sugarGliderRoom/sugarGlider-topic.png";
import homeIcon from "../../assets/components/home-icon.png";
import adoptBtn from "../../assets/components/adopt-button.png";
import shadowImage from "../../assets/sugarGliderRoom/sugarGlider-shadow.png";
import fridgeClose from "../../assets/sugarGliderRoom/fridge-close.png";
import mainChar from "../../assets/sugarGliderRoom/sugarGlider-main-char.png";
import tabTopic from "../../assets/sugarGliderRoom/sugarGlider-tab-topic.png";
import fridgeOpen from "../../assets/sugarGliderRoom/fridge-open.png";
import hungryOpinion from "../../assets/sugarGliderRoom/hungry-opinion.png";
import tabBarImage from "../../assets/components/tabbar.png";

const SugarGliderRoom = () => {
  const navigate = useNavigate();
  const [isAdopted, setIsAdopted] = useState(false);
  const [opinions, setOpinions] = useState<number[]>([]);
  const [isHoverFridge, setIsHoverFridge] = useState(false);

  const handleAdopt = () => {
    setIsAdopted(true);
  };

  const handleFridgeClick = () => {
    navigate("/lobby/sugar/food");
  };

  useEffect(() => {
    if (isAdopted) {
      const addMsg = (delay: number) => {
        setTimeout(() => {
          setOpinions((prev) => [...prev, Date.now()]);
        }, delay);
      };

      const removeMsg = (delay: number) => {
        setTimeout(() => {
          setOpinions((prev) => prev.slice(1));
        }, delay);
      };

      addMsg(800);
      addMsg(1500);
      addMsg(2200);
      addMsg(2900);

      removeMsg(2900);
      removeMsg(3600);
      removeMsg(4300);
    }
  }, [isAdopted]);

  return (
    <motion.div
      className="room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="room-wrapper">
        <div className="tab-bar-container">
          <img src={tabBarImage} className="tab-bar-img" alt="Tab Bar" />
        </div>

        <img src={bgImage} className="room-bg" alt="Sugar Glider Room" />

        {!isAdopted && (
          <div className="topic-container">
            <img src={topicImage} className="topic-img" alt="Nutrition Topic" />
          </div>
        )}

        <div
          className={`fridge-container ${isAdopted ? "can-interact" : ""}`}
          onMouseEnter={() => isAdopted && setIsHoverFridge(true)}
          onMouseLeave={() => setIsHoverFridge(false)}
          onClick={() => isAdopted && handleFridgeClick()}
        >
          <img
            src={isHoverFridge ? fridgeOpen : fridgeClose}
            className="fridge-img"
            alt="Refrigerator"
          />
          {!isAdopted && <div className="overlay-dark"></div>}
        </div>

        {!isAdopted && (
          <div className="shadow-container">
            <img src={shadowImage} className="shadow-img" alt="Shadow" />
          </div>
        )}

        <div className="opinion-stack">
          <AnimatePresence mode="sync">
            {opinions.map((id) => (
              <motion.div
                key={id}
                layout
                className="hungry-opinion"
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  y: { type: "spring", stiffness: 500, damping: 30 },
                }}
              >
                <img src={hungryOpinion} alt="หิวแล้ว" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isAdopted && (
          <motion.div
            className="main-char-container"
            initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: 0.1,
            }}
          >
            <img src={mainChar} className="main-char-img" alt="Sugar Glider" />
          </motion.div>
        )}

        {isAdopted && (
          <motion.div
            className="tab-topic-container"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img src={tabTopic} className="tab-topic-img" alt="Topic Info" />
          </motion.div>
        )}

        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <div className="room-content">
          {!isAdopted && (
            <motion.button
              className="adopt-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleAdopt()}
            >
              <img src={adoptBtn} alt="รับเลี้ยงสัตว์" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SugarGliderRoom;