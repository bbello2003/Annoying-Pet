import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./SugarGliderDining.css";

// Assets
import diningBg from "../../assets/sugarGliderRoom/sugarGlider-dining-background.png";
import homeIcon from "../../assets/components/home-icon.png";

// Import รูปอาหาร (ให้ชื่อตัวแปรตรงกับที่ใช้ในหน้า Food)
import eggImg from "../../assets/sugarGliderRoom/egg.png";
import corianderImg from "../../assets/sugarGliderRoom/coriander.png";
import carrotImg from "../../assets/sugarGliderRoom/carrot.png";
import blueberryImg from "../../assets/sugarGliderRoom/blueberry.png";
import tomatoImg from "../../assets/sugarGliderRoom/tomato.png";
import pelletedFoodImg from "../../assets/sugarGliderRoom/pelleted-food.png";
import appleImg from "../../assets/sugarGliderRoom/apple.png";
import insectImg from "../../assets/sugarGliderRoom/insect.png";
import broccoliImg from "../../assets/sugarGliderRoom/broccoli.png";

const foodMap: { [key: string]: string } = {
  egg: eggImg,
  coriander: corianderImg,
  carrot: carrotImg,
  blueberry: blueberryImg,
  tomato: tomatoImg,
  pelleted: pelletedFoodImg,
  apple: appleImg,
  insect: insectImg,
  broccoli: broccoliImg,
};

const SugarGliderDining = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // รับข้อมูลจากหน้า Food
  const state = location.state as { selectedFoods: string[] };
  const selectedFoods = state?.selectedFoods || [];

  // พิกัดวางอาหารบนโต๊ะ (ปรับเลข % ตามรูป dining ของคุณ)
  const diningPositions = [
    { top: "52%", left: "44%", width: "9vw" }, // ตำแหน่งชิ้นที่ 1
    { top: "62%", left: "50%", width: "11vw" }, // ตำแหน่งชิ้นที่ 2
    { top: "52%", left: "56%", width: "9vw" },  // ตำแหน่งชิ้นที่ 3
  ];

  return (
    <motion.div
      className="dining-overlay-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dining-wrapper">
        {/* ปุ่ม Home กลับไปหน้า Lobby */}
        <motion.button
          className="home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>

        <img src={diningBg} className="dining-full-bg" alt="Dining Background" />

        {/* ส่วนแสดงอาหารที่หล่นลงมาบนโต๊ะ */}
        <div className="table-items-container">
          <AnimatePresence>
            {selectedFoods.map((id, index) => (
              <motion.div
                key={`${id}-${index}`}
                className="food-on-table"
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  ...diningPositions[index],
                }}
                initial={{ y: -150, opacity: 0, rotate: -20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.3, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 12 
                }}
              >
                <img src={foodMap[id]} alt={id} style={{ width: "100%" }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ปุ่มเสร็จสิ้น กลับไปหน้าห้องน้อง */}
        <motion.button 
          className="finish-dining-btn" 
          onClick={() => navigate("/lobby/sugar")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          อิ่มแล้ว! กลับห้องกัน
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SugarGliderDining;