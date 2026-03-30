import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RabbitMap.css";

import bgMap from "../../assets/rabbitRoom/bg-map.png";
import nextArrow from "../../assets/components/next-arrow.png";

const RabbitMap = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="map-sub-page-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* รูปพื้นหลังแผนที่ */}
      <img src={bgMap} className="map-bg-img" alt="map background" />

      {/* ปุ่ม Next Arrow แปะทับวงกลมในรูป */}
      <motion.img
        src={nextArrow}
        className="map-next-asset"
        onClick={() => navigate("/lobby")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      />
    </motion.div>
  );
};

export default RabbitMap;