import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./SquirrelRoom.css";

import bgImage from "../../assets/squirrelRoom/squirrel-background.png";

const SquirrelRoom = () => {
const navigate = useNavigate();

  return (
    <motion.div
      className="room-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img src={bgImage} className="room-bg" alt="Squirrel Room" />

      <div className="room-content">
        {/* ปรับ Link ให้กลับมาที่ /lobby */}
        <button className="back-btn" onClick={() => navigate("/lobby")}>
          ← กลับไปหน้า Lobby
        </button>

        <div className="room-info">
          <h1>ห้องของ: กระรอก</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default SquirrelRoom;