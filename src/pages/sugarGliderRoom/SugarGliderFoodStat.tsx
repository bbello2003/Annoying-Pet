import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SugarGliderFoodStat.css";

// Assets
import statBg from "../../assets/sugarGliderRoom/sugarGlider-food-stat-background.png";
import homeIcon from "../../assets/components/home-icon.png";
import proteinWin from "../../assets/sugarGliderRoom/protein-window.png";
import fruitWin from "../../assets/sugarGliderRoom/fruit-window.png";
import vegetableWin from "../../assets/sugarGliderRoom/vegetable-window.png";
import foodAgeBtn from "../../assets/sugarGliderRoom/food-age-button.png";
import foodAgeBg from "../../assets/sugarGliderRoom/food-age-background.png";
import exploreBtn from "../../assets/sugarGliderRoom/explore-button.png";

const SugarGliderFoodStat = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("protein");
  const [isAgeVisible, setIsAgeVisible] = useState(false);
  const [isFoodAgeWindowVisible, setIsFoodAgeWindowVisible] = useState(false);

  const allWindows = [
    { id: "protein", src: proteinWin, alt: "Protein Statistics" },
    { id: "fruit", src: fruitWin, alt: "Fruit Statistics" },
    { id: "vegetable", src: vegetableWin, alt: "Vegetable Statistics" },
  ];

  const handleExploreClick = () => {
    console.log("Explore clicked!");
    setIsFoodAgeWindowVisible(true);
  };

  return (
    <motion.div
      className="stat-overlay-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="stat-wrapper">
        <img
          src={statBg}
          className="stat-full-bg"
          alt="Sugar Glider Room Background"
        />

        {/* Statistics Windows */}
        <div className="window-container">
          {allWindows.map((win) => (
            <motion.img
              key={win.id}
              src={win.src}
              className="stat-window-img"
              alt={win.alt}
              initial={false}
              animate={{
                opacity: activeTab === win.id ? 1 : 0,
                visibility: activeTab === win.id ? "visible" : "hidden",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          ))}

          <div className="tab-group">
            <div
              className="tab-hitbox"
              onClick={() => setActiveTab("protein")}
            ></div>
            <div
              className="tab-hitbox"
              onClick={() => setActiveTab("fruit")}
            ></div>
            <div
              className="tab-hitbox"
              onClick={() => setActiveTab("vegetable")}
            ></div>
          </div>
        </div>

        {/* To Food Age Page Button */}
        {!isAgeVisible && (
          <motion.button
            className="food-age-btn"
            onClick={() => setIsAgeVisible(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            <img src={foodAgeBtn} alt="Go to Food Age Section" />
          </motion.button>
        )}

        {/* Food Age Overlay */}
        <AnimatePresence>
          {isAgeVisible && (
            <motion.div
              className="food-age-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={foodAgeBg}
                className="food-age-full-bg"
                alt="Food Age Background"
              />

              <motion.button
                className="explore-btn"
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
              >
                <img src={exploreBtn} alt="Explore Button" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Food Age Window (Pop-up) */}
        <AnimatePresence>
          {isFoodAgeWindowVisible && (
            <motion.div
              className="food-age-window-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="placeholder-window">
                <p>หน้าต่างข้อมูลอาหารตามช่วงอายุ</p>
                <button onClick={() => setIsFoodAgeWindowVisible(false)}>
                  ปิด
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Button */}
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Return to Lobby" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SugarGliderFoodStat;