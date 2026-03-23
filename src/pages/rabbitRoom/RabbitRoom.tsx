import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RabbitRoom.css";

import bgImage from "../../assets/rabbitRoom/rabbit-background.png";

const RabbitRoom = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img src={bgImage} className="room-bg" alt="Rabbit Room" />

      <div className="room-content">
        {/* ปรับ Link ให้กลับมาที่ /lobby */}
        <button className="back-btn" onClick={() => navigate("/lobby")}>
          ← กลับไปหน้า Lobby
        </button>

        <div className="room-info">
          <h1>ห้องของ: กระต่าย</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default RabbitRoom;