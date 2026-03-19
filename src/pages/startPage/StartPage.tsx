import { motion } from 'framer-motion';
import './StartPage.css';

import startBg from "../../assets/startPage/start-background.png"; 

const StartPage = () => {
  return (
    <motion.div 
      className="start-page-wrapper"
      style={{ backgroundImage: `url(${startBg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
  );
};

export default StartPage;