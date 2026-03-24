import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SugarGliderFood.css";

import fridgeBg from "../../assets/sugarGliderRoom/sugarGlider-fridge-background.png";
import homeIcon from "../../assets/components/home-icon.png";
import serveIcon from "../../assets/sugarGliderRoom/serve-button.png";

import eggImg from "../../assets/sugarGliderRoom/egg.png";
import corianderImg from "../../assets/sugarGliderRoom/coriander.png";
import carrotImg from "../../assets/sugarGliderRoom/carrot.png";
import blueberryImg from "../../assets/sugarGliderRoom/blueberry.png";
import tomatoImg from "../../assets/sugarGliderRoom/tomato.png";
import pelletedFoodImg from "../../assets/sugarGliderRoom/pelleted-food.png";
import appleImg from "../../assets/sugarGliderRoom/apple.png";
import insectImg from "../../assets/sugarGliderRoom/insect.png";
import broccoliImg from "../../assets/sugarGliderRoom/broccoli.png";

interface FoodStyle {
  width: string;
  top: string;
  left: string;
  marginTop?: string;
  marginLeft?: string;
  marginBottom?: string;
  transform?: string;
}

interface FoodItem {
  id: string;
  img: string;
  fridgeStyle: FoodStyle;
  plateStyle: PlateStyle[];
}

interface PlateStyle {
  width?: string;
  top?: string;
  left?: string;
  rotate?: string;
  marginTop?: string;
  marginLeft?: string;
}

const SugarGliderFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFoodIds, setSelectedFoodIds] = useState<string[]>([]);

  useEffect(() => {
    if (location.state?.selectedFoods && location.state.selectedFoods.length === 0) {
      setSelectedFoodIds([]);
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const foodItems: FoodItem[] = [
    {
      id: "egg",
      img: eggImg,
      fridgeStyle: { width: "12.3vw", top: "28.8%", left: "16.1%" },
      plateStyle: [
        { width: "16vw", top: "47%", left: "60.5%" },
        { width: "12.3vw", top: "67%", left: "55%" },
        { width: "12vw", top: "70%", left: "67%" },
      ],
    },
    {
      id: "coriander",
      img: corianderImg,
      fridgeStyle: { width: "9.5vw", top: "21.5%", left: "27.7%" },
      plateStyle: [
        { width: "11vw", top: "42.5%", left: "63%" },
        { width: "9.5vw", top: "65%", left: "56%" },
        { width: "9.5vw", top: "66.5%", left: "68.5%" },
      ],
    },
    {
      id: "carrot",
      img: carrotImg,
      fridgeStyle: { width: "12.5vw", top: "26.4%", left: "36.7%" },
      plateStyle: [
        { width: "16vw", top: "45%", left: "60%" },
        { width: "12.5vw", top: "66%", left: "55%" },
        { width: "14vw", top: "68%", left: "65%" },
      ],
    },
    {
      id: "blueberry",
      img: blueberryImg,
      fridgeStyle: { width: "10.9vw", top: "53.8%", left: "15.9%" },
      plateStyle: [
        { width: "17vw", top: "45%", left: "60%" },
        { width: "10.9vw", top: "68%", left: "55%" },
        { width: "14vw", top: "68.5%", left: "65.5%" },
      ],
    },
    {
      id: "tomato",
      img: tomatoImg,
      fridgeStyle: { width: "11.2vw", top: "49.1%", left: "27.1%" },
      plateStyle: [
        { width: "15vw", top: "42%", left: "60.5%" },
        { width: "10.9vw", top: "66%", left: "55%" },
        { width: "12vw", top: "67%", left: "66.5%" },
      ],
    },
    {
      id: "pelleted",
      img: pelletedFoodImg,
      fridgeStyle: { width: "9.2vw", top: "46.8%", left: "39.2%" },
      plateStyle: [
        { width: "11vw", top: "41.5%", left: "63%" },
        { width: "9.2vw", top: "65%", left: "56%" },
        { width: "11vw", top: "66.5%", left: "68%" },
      ],
    },
    {
      id: "apple",
      img: appleImg,
      fridgeStyle: { width: "11.3vw", top: "76.3%", left: "16%" },
      plateStyle: [
        { width: "16vw", top: "43%", left: "61%" },
        { width: "11.3vw", top: "66.5%", left: "55%" },
        { width: "13vw", top: "68%", left: "67%" },
      ],
    },
    {
      id: "insect",
      img: insectImg,
      fridgeStyle: { width: "9.2vw", top: "79%", left: "28%" },
      plateStyle: [
        { width: "16vw", top: "42%", left: "60.5%" },
        { width: "10vw", top: "66%", left: "55.5%" },
        { width: "13vw", top: "66.5%", left: "66%" },
      ],
    },
    {
      id: "broccoli",
      img: broccoliImg,
      fridgeStyle: { width: "11.2vw", top: "74.5%", left: "37.3%" },
      plateStyle: [
        { width: "15vw", top: "42%", left: "61%" },
        { width: "10vw", top: "66.5%", left: "55.5%" },
        { width: "13vw", top: "66.5%", left: "66%" },
      ],
    },
  ];

  const handleFoodClick = (id: string) => {
    if (selectedFoodIds.includes(id)) {
      setSelectedFoodIds((prev) => prev.filter((foodId) => foodId !== id));
    } else if (selectedFoodIds.length < 3) {
      setSelectedFoodIds((prev) => [...prev, id]);
    }
  };

  return (
    <motion.div
      className="food-overlay-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="food-wrapper">
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <img
          src={fridgeBg}
          className="fridge-open-full-bg"
          alt="Fridge Background"
        />

        {/* --- Refrigerator Area (Left Side) --- */}
        <div className="fridge-shelf-area">
          {foodItems.map((item) => {
            const isSelected = selectedFoodIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                className={`food-slot-absolute ${isSelected ? "is-selected" : ""}`}
                onClick={() => handleFoodClick(item.id)}
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 5,
                  ...item.fridgeStyle,
                }}
                whileHover={!isSelected ? { scale: 1.1 } : {}}
                whileTap={!isSelected ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <img
                  src={item.img}
                  alt={item.id}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* --- Plate Area (Right Side) --- */}
        <div className="plate-area">
          <AnimatePresence>
            {selectedFoodIds.map((id, index) => {
              const food = foodItems.find((f) => f.id === id);
              if (!food) return null;

              const currentPlateStyle = food.plateStyle[index];

              return (
                <motion.div
                  key={id}
                  className="food-on-plate"
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "translate(-50%, -50%)",
                    ...currentPlateStyle,
                  }}
                  initial={{ opacity: 0, scale: 0, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <img
                    src={food.img}
                    alt="selected"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- Serve Button --- */}
        <AnimatePresence>
          {selectedFoodIds.length === 3 && (
            <motion.button
              className="serve-food-btn"
              onClick={() => navigate("dining", { state: { selectedFoods: selectedFoodIds } })}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <img src={serveIcon} alt="Serve" />
            </motion.button>
          )}
        </AnimatePresence>

        <Outlet />
      </div>
    </motion.div>
  );
};

export default SugarGliderFood;