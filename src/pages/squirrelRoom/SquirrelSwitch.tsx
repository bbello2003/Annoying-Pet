import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom";
import "./SquirrelSwitch.css";

import lightOnBg from "../../assets/squirrelRoom/light-on-bg.png";
import lightOffBg from "../../assets/squirrelRoom/light-off-bg.png";
import sfxKukKak from "../../assets/squirrelRoom/sfx-kuk-kak.png";
import sfxKungKang from "../../assets/squirrelRoom/sfx-kung-kang.png";
import sfxKokKaek from "../../assets/squirrelRoom/sfx-kok-kaek.png";
import sfxKhrom from "../../assets/squirrelRoom/sfx-khrom.png";

const SquirrelSwitch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleSwitchClick = () => {
    if (step !== 0) return;
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) setTimeout(() => setStep(2), 800);
    else if (step === 2) setTimeout(() => setStep(3), 800);
    else if (step === 3) {
      setTimeout(() => {
        setStep(4);
        setIsShaking(true);
      }, 800);
    } else if (step === 4) {
      setTimeout(() => {
        setIsShaking(false);
        setStep(5);
      }, 1200);
    }
  }, [step]);

  return (
    <motion.div
      className={`switch-page-container ${isShaking ? "shake-anim" : ""} ${step > 0 ? "is-dark" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="switch-content-wrapper">
        <img src={lightOffBg} className="switch-main-bg absolute-pos" alt="Off" />
        
        <img 
          src={lightOnBg} 
          className="switch-main-bg absolute-pos" 
          alt="On" 
          style={{ visibility: step < 5 ? 'visible' : 'hidden' }} 
        />

        {step === 0 && (
          <div className="invisible-switch-hitbox" onClick={handleSwitchClick} />
        )}

        <img 
          src={sfxKukKak} 
          className="switch-sfx-overlay" 
          style={{ display: step === 1 ? 'block' : 'none' }} 
        />
        <img 
          src={sfxKungKang} 
          className="switch-sfx-overlay" 
          style={{ display: step === 2 ? 'block' : 'none' }} 
        />
        <img 
          src={sfxKokKaek} 
          className="switch-sfx-overlay" 
          style={{ display: step === 3 ? 'block' : 'none' }} 
        />
        <img 
          src={sfxKhrom} 
          className="switch-sfx-overlay" 
          style={{ display: step === 4 ? 'block' : 'none' }} 
        />

        {step === 5 && (
          <motion.div
            className="invisible-switch-hitbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("clean")}
          >
          </motion.div>
        )}
        <Outlet/>
      </div>
    </motion.div>
  );
};

export default SquirrelSwitch;