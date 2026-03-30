import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom";
import "./LobbyPage.css";

import lobbyBg from "../../assets/lobbyPage/lobby.png";
import rabbitDef from "../../assets/lobbyPage/rabbit-room-default.png";
import rabbitAct from "../../assets/lobbyPage/rabbit-room-sick.png";
import hamsterDef from "../../assets/lobbyPage/hamster-room-default.png";
import hamsterAct from "../../assets/lobbyPage/hamster-room-playing.png";
import squirrelDef from "../../assets/lobbyPage/squirrel-room-default.png";
import squirrelAct from "../../assets/lobbyPage/squirrel-room-exercise.png";
import hedgehogDef from "../../assets/lobbyPage/hedgehog-room-default.png";
import hedgehogAct from "../../assets/lobbyPage/hedgehog-room-dirty.png";
import sugarDef from "../../assets/lobbyPage/sugarGlider-room-default.png";
import sugarAct from "../../assets/lobbyPage/sugarGlider-room-food.png";
import secretDef from "../../assets/lobbyPage/secret-room-default.png";
import secretAct from "../../assets/lobbyPage/secret-room-code.png";
import exploreTopic from "../../assets/lobbyPage/explore-topic.png";
import moneySound from "../../assets/sounds/money-sound-effect.mp3";

const POOL_SIZE = 10;
export const cashAudioPool = Array.from({ length: POOL_SIZE }, () => {
  const audio = new Audio(moneySound);
  audio.preload = "auto";
  audio.load();
  return audio;
});

let poolIndex = 0;

export const playGlobalCashSound = () => {
  const audio = cashAudioPool[poolIndex];

  audio.currentTime = 1;
  audio.volume = 0.5;

  const onTimeUpdate = () => {
    if (audio.currentTime >= 2) {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
    }
  };

  audio.addEventListener("timeupdate", onTimeUpdate);
  audio.play().catch(() => {});

  poolIndex = (poolIndex + 1) % POOL_SIZE;
};

const ROOMS_CONFIG = [
  {
    id: "rabbit",
    def: rabbitDef,
    act: rabbitAct,
    top: "41.2%",
    left: "24.3%",
    size: "26.2vw",
  },
  {
    id: "hamster",
    def: hamsterDef,
    act: hamsterAct,
    top: "41.6%",
    left: "50%",
    size: "25.5vw",
  },
  {
    id: "squirrel",
    def: squirrelDef,
    act: squirrelAct,
    top: "41.5%",
    left: "75.9%",
    size: "25.8vw",
  },
  {
    id: "hedgehog",
    def: hedgehogDef,
    act: hedgehogAct,
    top: "71%",
    left: "26.5%",
    size: "30.6vw",
  },
  {
    id: "sugar",
    def: sugarDef,
    act: sugarAct,
    top: "71%",
    left: "57.3%",
    size: "30vw",
  },
  {
    id: "secret",
    def: secretDef,
    act: secretAct,
    top: "71.1%",
    left: "80.7%",
    size: "16vw",
  },
];

const LobbyPage = () => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const navigate = useNavigate();

  const completedRooms = [
    localStorage.getItem("rabbit_completed"),
    localStorage.getItem("hamster_completed"),
    localStorage.getItem("hedgehog_completed"),
    localStorage.getItem("sugar_completed"),
    localStorage.getItem("squirrel_completed"),
  ];

  const isAllCompleted = completedRooms.every((room) => room === "true");

  const handleRoomClick = (id: string) => {
    if (id === "secret" && !isAllCompleted) return;
    navigate(`/lobby/${id}`);
  };

  return (
    <div className={`lobby-page-container ${hoveredRoom ? "is-hovering" : ""}`}>
      <div className="lobby-wrapper">
        <img src={lobbyBg} className="full-bg" alt="Lobby Background" />
        <img src={exploreTopic} className="lobby-header" alt="Header Title" />

        {ROOMS_CONFIG.map((room) => {
          const isLockedSecret = room.id === "secret" && !isAllCompleted;

          return (
            <div
              key={room.id}
              className={`room-item ${isLockedSecret ? "is-locked" : ""}`}
              style={{
                top: room.top,
                left: room.left,
                width: room.size,
                cursor: isLockedSecret ? "not-allowed" : "pointer",
              }}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={() => handleRoomClick(room.id)}
            >
              <motion.img
                src={hoveredRoom === room.id ? room.act : room.def}
                alt={room.id}
                className="room-img"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default LobbyPage;