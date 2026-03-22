import React from "react";
import { motion } from "framer-motion";
import "./LobbyPage.css";

// Import Assets
import lobbyBg from "../../assets/lobbyPage/lobby.png";

const LobbyPage: React.FC = () => {
  return (
    <div className="lobby-page-container">
      <motion.img
        src={lobbyBg}
        alt="Lobby Background"
        className="lobby-bg"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
};

export default LobbyPage;