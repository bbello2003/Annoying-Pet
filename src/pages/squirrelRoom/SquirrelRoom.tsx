import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import "./SquirrelRoom.css";

import bgImage from "../../assets/squirrelRoom/squirrel-background.png";

const SquirrelRoom = () => {
const navigate = useNavigate();

  return (
    <div className="room-overlay">
      <img src={bgImage} className="room-bg" alt="Background" />

      <div className="room-content">
        <button className="back-btn" onClick={() => navigate("/lobby")}>
          ← กลับไปหน้า Lobby
        </button>

        <div className="room-info">
          <h1>ห้องของ: กระรอก</h1>
        </div>
      </div>
    </div>
  );
};

export default SquirrelRoom;