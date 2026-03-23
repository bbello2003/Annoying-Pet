import { useParams, useNavigate } from "react-router-dom";

const SugarGliderRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "white", backgroundColor: "#33a681", height: "100vh" }}>
      <h1>ยินดีต้อนรับสู่ห้องของ: {id}</h1>
      <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer" }}>
        กลับไปหน้า Lobby
      </button>
    </div>
  );
};

export default SugarGliderRoom;