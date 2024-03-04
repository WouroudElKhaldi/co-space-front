"use client";

import Image from "next/image";
import styles from "./spaceCard.module.css";
import Carousel from "../carousel/carousel";
import { getSpaceImage } from "@/fetchData/spaces";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

export default function SpaceCard({ data }) {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  const pathname = usePathname();
  const [images, setImages] = useState([]);

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
      className={`${styles.card} ${pathname === "/" ? styles.home : ""}`}
    >
      <Link href={`spaces/${data._id}`}>
        <div className={styles.img}>
          <Carousel images={images && images} />
        </div>
        <div className={styles.info}>
          <p className={styles.top}>
            <p className={styles.title}>{data.name}</p>
            {data.averageRating && (
              <span className={styles.price}>
                ⭐{parseFloat(data.averageRating).toFixed(2)}
              </span>
            )}
          </p>
          <p className={styles.owner}>
            Srarting{" "}
            <b
              style={{
                marginLeft: "0.5rem",
              }}
            >
              {" " + data.dailyPrice}
            </b>
            $ /day
          </p>
          <span className={styles.btm}>
            <p className={styles.type}>{data.category.name} Space</p>
            <p className={styles.location}>{data.city.city}</p>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
