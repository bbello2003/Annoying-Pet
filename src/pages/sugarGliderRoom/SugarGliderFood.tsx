import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./SugarGliderFood.css";

// Assets
import fridgeOpenBg from "../../assets/sugarGliderRoom/fridge-open.png"; // รูปตู้เย็นที่เปิดอยู่

const SugarGliderFood = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="food-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="food-wrapper">
        {/* รูปตู้เย็นเปิดเป็นพื้นหลังของหน้านี้ */}
        <img src={fridgeOpenBg} className="fridge-open-bg" alt="Fridge Open" />

        <div className="food-selection-area">
          {/* เดี๋ยวเราจะเอารูปอาหารมาวางเรียงกันตรงนี้ */}
          <h2 style={{ color: "white" }}>เลือกอาหารให้น้อง</h2>
          
          <div className="food-grid">
             {/* ตัวอย่างปุ่มอาหาร */}
             <button className="food-item">หนอน (Mealworm)</button>
             <button className="food-item">แอปเปิ้ล</button>
          </div>
        </div>

        {/* ปุ่มปิดตู้เย็น (กลับไปหน้าห้อง) */}
        <button className="close-fridge-btn" onClick={() => navigate("/lobby/sugar")}>
          ✖ ปิดตู้เย็น
        </button>
      </div>
    </motion.div>
  );
};

export default SugarGliderFood;