"use client";
import { motion } from "framer-motion";
import styles from "./scrollText.module.css";

const ScrollingText = ({ children }) => {
  const slider = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-110%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 18,
      },
    },
  };

  return (
    <motion.div
      variants={slider}
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      <div className={styles.img}></div>
      {children}
    </motion.div>
  );
};

export default ScrollingText;
