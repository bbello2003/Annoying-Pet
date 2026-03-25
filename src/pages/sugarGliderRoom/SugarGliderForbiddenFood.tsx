import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SugarGliderForbiddenFood.css";

import forbiddenBg from "../../assets/sugarGliderRoom/forbidden-food-background.png";
import summaryBg from "../../assets/sugarGliderRoom/forbidden-food-summary.png";
import nextArrowIcon from "../../assets/components/next-arrow.png";
import homeCircleBtn from "../../assets/components/home-circle-button.png";
import poisonOverlay from "../../assets/sugarGliderRoom/poison-overlay.png";
import sugarOverlay from "../../assets/sugarGliderRoom/sugar-overlay.png";
import digestOverlay from "../../assets/sugarGliderRoom/digest-overlay.png";

const SugarGliderForbiddenFood = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleFilterChange = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter("all");
    } else {
      setActiveFilter(filter);
    }
  };

  const overlays: { [key: string]: string } = {
    poison: poisonOverlay,
    sugar: sugarOverlay,
    digest: digestOverlay,
  };

  return (
    <motion.div
      className={`forbidden-page ${isSummaryVisible ? "summary-bg-active" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="forbidden-wrapper">
        <img src={forbiddenBg} className="forbidden-full-bg" alt="Base BG" />

        <AnimatePresence initial={false}>
          {activeFilter !== "all" && (
            <motion.img
              key={activeFilter}
              src={overlays[activeFilter]}
              className="filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        <div className="forbidden-filter-group">
          <div
            className="filter-hitbox"
            onClick={() => handleFilterChange("poison")}
          ></div>
          <div
            className="filter-hitbox"
            onClick={() => handleFilterChange("sugar")}
          ></div>
          <div
            className="filter-hitbox"
            onClick={() => handleFilterChange("digest")}
          ></div>
        </div>

        <AnimatePresence>
          {isSummaryVisible && (
            <motion.img
              src={summaryBg}
              className="summary-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isSummaryVisible ? (
            <motion.button
              key="next-btn"
              className="forbidden-next-btn"
              onClick={() => setIsSummaryVisible(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <img src={nextArrowIcon} alt="Next Page" />
            </motion.button>
          ) : (
            <motion.button
              key="home-btn"
              className="forbidden-home-circle-btn"
              onClick={() => navigate("/lobby")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <img src={homeCircleBtn} alt="Back to Lobby" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SugarGliderForbiddenFood;