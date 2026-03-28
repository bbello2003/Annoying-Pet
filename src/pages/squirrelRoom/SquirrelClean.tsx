import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SquirrelClean.css";

import cleanBg from "../../assets/squirrelRoom/clean-bg.png";
import allFixedBg from "../../assets/squirrelRoom/clean-all-fixed-background.png";
import weightLifting from "../../assets/squirrelRoom/weightlifting.png";
import weightLiftingMessed from "../../assets/squirrelRoom/weight-lifting-broke.png";
import shelfDumbell from "../../assets/squirrelRoom/shelf-dumbell-fixed.png";
import shelfDumbellMessed from "../../assets/squirrelRoom/shelf-dumbell-broke.png";
import ball from "../../assets/squirrelRoom/ball-fixed.png";
import ballMessed from "../../assets/squirrelRoom/ball-broke.png";
import catherBell from "../../assets/squirrelRoom/catherbell-fixed.png";
import catherBellMessed from "../../assets/squirrelRoom/catherbell-broke.png";
import dumbbell from "../../assets/squirrelRoom/dumbell-fixed.png";
import dumbbellMessed from "../../assets/squirrelRoom/dumbell-broke.png";
import squirrelDef from "../../assets/squirrelRoom/squirrel-default.png";
import topic1Text from "../../assets/squirrelRoom/clean-topic-text-1.png";
import topic2Text from "../../assets/squirrelRoom/clean-topic-text-2.png";
import homeCircleBtn from "../../assets/components/home-circle-button.png"; 

const SquirrelClean = () => {
  const navigate = useNavigate();
  const [textStep, setTextStep] = useState(0);

  const [repairs, setRepairs] = useState({
    weight: false,
    shelf: false,
    ball: false,
    kettle: false,
    dumbell: false,
  });

  useEffect(() => {
    if (textStep === 0) {
      setTimeout(() => setTextStep(1), 1500);
    }
  }, [textStep]);

  const handleRepair = (key: keyof typeof repairs) => {
    if (textStep < 1) return;
    setRepairs((prev) => ({ ...prev, [key]: true }));
  };

  const isAllFixed =
    repairs.weight &&
    repairs.shelf &&
    repairs.ball &&
    repairs.kettle &&
    repairs.dumbell;

  return (
    <motion.div
      className={`clean-page-container ${isAllFixed ? "is-finished" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="clean-content-wrapper">
        {/* main background */}
        <img
          src={isAllFixed ? allFixedBg : cleanBg}
          className="clean-main-bg"
          alt="bg"
        />

        {/* layers fade when all fixed */}
        <AnimatePresence>
          {!isAllFixed && (
            <motion.div
              key="messed-layer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* squirrel */}
              <img src={squirrelDef} className="clean-squirrel-pos" alt="squirrel-def" />

              <div className={`repair-item ${repairs.shelf ? "shelf-fixed" : "shelf-messed"}`} onClick={() => handleRepair("shelf")}>
                <img src={repairs.shelf ? shelfDumbell : shelfDumbellMessed} alt="shelf" />
              </div>

              <div className={`repair-item ${repairs.ball ? "ball-fixed" : "ball-messed"}`} onClick={() => handleRepair("ball")}>
                <img src={repairs.ball ? ball : ballMessed} alt="ball" />
              </div>

              <div className={`repair-item ${repairs.kettle ? "kettle-fixed" : "kettle-messed"}`} onClick={() => handleRepair("kettle")}>
                <img src={repairs.kettle ? catherBell : catherBellMessed} alt="kettle" />
              </div>

              <div className={`repair-item ${!repairs.dumbell ? "dumbell-messed" : "dumbell-fixed"}`} onClick={() => handleRepair("dumbell")}>
                <img src={repairs.dumbell ? dumbbell : dumbbellMessed} alt="dumbell" />
              </div>

              <div className={`repair-item ${repairs.weight ? "weight-fixed" : "weight-messed"}`} onClick={() => handleRepair("weight")}>
                <img src={repairs.weight ? weightLifting : weightLiftingMessed} alt="weight" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAllFixed && (
            <motion.div
              key="fixed-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* home circle button */}
              <motion.div
                className="clean-home-circle-pos"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
                onClick={() => navigate("/lobby")}
              >
                <img src={homeCircleBtn} alt="Home" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* topics text */}
        <AnimatePresence>
          {!isAllFixed && (
            <motion.img
              key={textStep}
              src={textStep === 0 ? topic1Text : topic2Text}
              className="clean-topic-pos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SquirrelClean;