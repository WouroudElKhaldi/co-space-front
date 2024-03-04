import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import styles from "./cityComp.module.css";
import Link from "next/link";
export function CityComp({ data }) {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const varRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.5 } // Change threshold as needed
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (varRef) {
        observer.unobserve(varRef);
      }
    };
  }, [controls]);
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "20px" }}
    >
      <Link href={`/spaces/by-city/${data.href}`} className={styles.card}>
        <Image src={data.image} height={100} width={100} alt="tripoli" />
        <p className={styles.p}>{data.name}</p>
      </Link>
    </motion.div>
  );
}
