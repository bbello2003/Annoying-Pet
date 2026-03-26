import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SquirrelSwitch.css";

// --- Assets ---
import lightOnBg from "../../assets/squirrelRoom/light-on-bg.png";
import lightOffBg from "../../assets/squirrelRoom/light-off-bg.png";
import sfxKukKak from "../../assets/squirrelRoom/sfx-kuk-kak.png";
import sfxKungKang from "../../assets/squirrelRoom/sfx-kung-kang.png";
import sfxKokKaek from "../../assets/squirrelRoom/sfx-kok-kaek.png";
import sfxKhrom from "../../assets/squirrelRoom/sfx-khrom.png";

const SquirrelSwitch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: On, 1: KukKak, 2: KungKang, 3: KokKaek, 4: Khrom, 5: Off
  const [isShaking, setIsShaking] = useState(false);

  const handleSwitchClick = () => {
    if (step !== 0) return; // กดได้เฉพาะตอนไฟเปิดอยู่ครั้งแรก

    // เริ่ม Step 1: กุกกัก
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => setStep(2), 1000); // กิงกัง
    } else if (step === 2) {
      setTimeout(() => setStep(3), 1000); // ก๊อกแก๊ก
    } else if (step === 3) {
      setTimeout(() => {
        setStep(4);
        setIsShaking(true); // เริ่มสั่นตอนโครม
      }, 1000);
    } else if (step === 4) {
      setTimeout(() => {
        setIsShaking(false);
        setStep(5); // จบที่หน้ามืด
      }, 1200);
    }
  }, [step]);

  // กำหนดรูปที่จะโชว์ตาม Step
  const getSfxImage = () => {
    switch (step) {
      case 1: return sfxKukKak;
      case 2: return sfxKungKang;
      case 3: return sfxKokKaek;
      case 4: return sfxKhrom;
      default: return null;
    }
  };

  return (
    <motion.div
      className={`switch-page-container ${isShaking ? "shake-anim" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="switch-content-wrapper">
        {/* พื้นหลัง: ถ้ายังไม่ถึง step 5 ให้โชว์ On ถ้าถึงแล้วโชว์ Off */}
        <img
          src={step < 5 ? lightOnBg : lightOffBg}
          className="switch-main-bg"
          alt="background"
        />

        {/* พื้นที่ล่องหนทับสวิตช์เพื่อให้กดได้ */}
        {step === 0 && (
          <div className="invisible-switch-hitbox" onClick={handleSwitchClick} />
        )}

        {/* แสดงผล SFX ตามลำดับ */}
        <AnimatePresence>
          {getSfxImage() && (
            <motion.img
              key={step}
              src={getSfxImage()!}
              className="switch-sfx-overlay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* ปุ่มไปหน้าถัดไป (กวาดบ้าน) จะโผล่มาตอนปิดไฟแล้ว */}
        {step === 5 && (
          <motion.div 
            className="next-step-trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/lobby/squirrel/clean")} // สมมติ path หน้าถัดไป
          >
             {/* ใส่รูปปุ่ม Next ของคุณตรงนี้ */}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SquirrelSwitch;