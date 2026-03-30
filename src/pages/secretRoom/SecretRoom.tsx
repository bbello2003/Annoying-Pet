import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import "./SecretRoom.css";

import bgSecret from "../../assets/secretRoom/bg-secret.png";
import receiptImg from "../../assets/secretRoom/receipt-summary.png";
import topicImg from "../../assets/secretRoom/summary-topic-text.png";
import nextArrow from "../../assets/components/next-arrow.png";
import homeIcon from "../../assets/components/home-icon.png";
import tabbarImg from "../../assets/components/tabbar.png";
import endBg from "../../assets/secretRoom/end.png";
import logoImg from "../../assets/secretRoom/annoying-pet-logo.png";
import restartBtnImg from "../../assets/secretRoom/restart-button.png";

import w1 from "../../assets/secretRoom/warning-1.png";
import w2 from "../../assets/secretRoom/warning-2.png";
import w3 from "../../assets/secretRoom/warning-3.png";
import w4 from "../../assets/secretRoom/warning-4.png";
import w5 from "../../assets/secretRoom/warning-5.png";
import w6 from "../../assets/secretRoom/warning-6.png";
import w7 from "../../assets/secretRoom/warning-7.png";
import w8 from "../../assets/secretRoom/warning-8.png";
import w9 from "../../assets/secretRoom/warning-9.png";
import w10 from "../../assets/secretRoom/warning-10.png";
import w11 from "../../assets/secretRoom/warning-11.png";
import w12 from "../../assets/secretRoom/warning-12.png";

const SecretRoom = () => {
  const navigate = useNavigate();
  const viewportRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: viewportRef });

  const [triggered, setTriggered] = useState<Record<string, boolean>>({});
  const [isEnded, setIsEnded] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  const handleRestart = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const checkTrigger = (id: string, threshold: number) => {
        if (latest > threshold && !triggered[id]) {
          setTriggered((prev) => ({ ...prev, [id]: true }));
        }
      };

      checkTrigger("topic", 0.05);
      checkTrigger("w1", 0.15);
      checkTrigger("w2", 0.22);
      checkTrigger("w3", 0.3);
      checkTrigger("w4", 0.38);
      checkTrigger("w5", 0.45);
      checkTrigger("w6", 0.52);
      checkTrigger("w7", 0.6);
      checkTrigger("w8", 0.68);
      checkTrigger("w9", 0.75);
      checkTrigger("w10", 0.82);
      checkTrigger("w11", 0.88);
      checkTrigger("w12", 0.92);
      checkTrigger("next", 0.96);
    });
  }, [scrollYProgress, triggered]);

  return (
    <motion.div
      className="secret-outer-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Tabbar Fixed */}
      <div className="fixed-tabbar-header">
        <img src={tabbarImg} className="tabbar-bg" alt="tabbar" />
        <motion.button
          className="rabbit-home-btn"
          onClick={() => navigate("/lobby")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <img src={homeIcon} alt="Home" />
        </motion.button>
      </div>

      <div className="secret-scroll-viewport" ref={viewportRef}>
        <div className="secret-content-holder">
          <img src={bgSecret} className="secret-bg-main" alt="background" />

          <AnimatePresence>
            {triggered.w3 && (
              <motion.img
                src={w3}
                className="abs-asset win-back win-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w4 && (
              <motion.img
                src={w4}
                className="abs-asset win-back win-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w9 && (
              <motion.img
                src={w9}
                className="abs-asset win-back win-9"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w10 && (
              <motion.img
                src={w10}
                className="abs-asset win-back win-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
          </AnimatePresence>

          <img
            src={receiptImg}
            className="abs-asset receipt-pos"
            alt="receipt"
          />

          <AnimatePresence>
            {triggered.topic && (
              <motion.img
                src={topicImg}
                className="abs-asset topic-pos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
            {triggered.w1 && (
              <motion.img
                src={w1}
                className="abs-asset win-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w2 && (
              <motion.img
                src={w2}
                className="abs-asset win-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w5 && (
              <motion.img
                src={w5}
                className="abs-asset win-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w6 && (
              <motion.img
                src={w6}
                className="abs-asset win-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w7 && (
              <motion.img
                src={w7}
                className="abs-asset win-7"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w8 && (
              <motion.img
                src={w8}
                className="abs-asset win-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w11 && (
              <motion.img
                src={w11}
                className="abs-asset win-11"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {triggered.w12 && (
              <motion.img
                src={w12}
                className="abs-asset win-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
          </AnimatePresence>

          {/* Next Button */}
          <AnimatePresence>
            {triggered.next && !isEnded && (
              <motion.img
                src={nextArrow}
                className="abs-asset final-next-arrow"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEnded(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* End Screen Overlay */}
      <AnimatePresence>
        {isEnded && (
          <motion.div
            className="final-end-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="end-content-wrapper">
              <img src={endBg} className="end-bg-full" alt="End Background" />

              <motion.img
                src={logoImg}
                className="end-logo-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                onAnimationComplete={() =>
                  setTimeout(() => setShowRestart(true), 800)
                }
              />

              <AnimatePresence>
                {showRestart && (
                  <motion.img
                    src={restartBtnImg}
                    className="end-restart-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    onClick={handleRestart}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SecretRoom;