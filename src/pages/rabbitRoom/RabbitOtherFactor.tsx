import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RabbitOtherFactor.css";

// นำเข้ารูปพื้นหลังจาก Assets (ตรวจสอบ Path อีกครั้งให้ตรงกับโปรเจกต์คุณ)
import bgOtherFactor from "../../assets/rabbitRoom/bg-other-factor.png";

const RabbitOtherFactor = () => {
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับจัดการการคลิกที่ Folder หรือปุ่มถัดไป
  const handleFolderClick = (topic: string) => {
    console.log(`Selected topic: ${topic}`);
    // navigate(`/rabbit/factor/${topic}`); // เปิดใช้หากมีหน้าย่อย
  };

  const handleNextBtn = () => {
    navigate("/next-path"); // เปลี่ยนเป็น Path ปลายทางที่ต้องการ
  };

  return (
    <motion.div
      className="factor-container-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Image */}
      <img src={bgOtherFactor} className="factor-bg-img" alt="Background Factor" />

      {/* สร้างปุ่มล่องหนทับตำแหน่ง Folder ในรูป 
          ตำแหน่ง % เหล่านี้อ้างอิงจากการกะประมาณตามรูปภาพที่คุณส่งมา
      */}

      {/* Folder: อุปกรณ์ */}
      <div 
        className="folder-trigger item-tool" 
        onClick={() => handleFolderClick("tool")} 
      />

      {/* Folder: พันธุกรรม */}
      <div 
        className="folder-trigger item-gene" 
        onClick={() => handleFolderClick("gene")} 
      />

      {/* Folder: ความเครียด */}
      <div 
        className="folder-trigger item-stress" 
        onClick={() => handleFolderClick("stress")} 
      />

      {/* Folder: สภาพแวดล้อม */}
      <div 
        className="folder-trigger item-env" 
        onClick={() => handleFolderClick("environment")} 
      />

      {/* Folder: อาหาร */}
      <div 
        className="folder-trigger item-food" 
        onClick={() => handleFolderClick("food")} 
      />

      {/* ปุ่มลูกศรสีดำ (Next Button) */}
      <motion.div
        className="next-btn-trigger"
        onClick={handleNextBtn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
    </motion.div>
  );
};

export default RabbitOtherFactor;