import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SugarGliderFoodStat.css";
import statBg from "../../assets/sugarGliderRoom/sugarGlider-food-stat-background.png";

const SugarGliderFoodStat = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="stat-overlay-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="stat-wrapper">
        {/* รูปพื้นหลังสถิติ - แสดงเต็มกรอบ 16:9 */}
        <img 
          src={statBg} 
          className="stat-full-bg" 
          alt="Food Stat Background" 
        />

        {/* คุณสามารถใส่ปุ่ม Next หรือปุ่มปิดทับบน Wrapper นี้ได้เลยในอนาคต */}
      </div>
    </motion.div>
  );
};

export default SugarGliderFoodStat;