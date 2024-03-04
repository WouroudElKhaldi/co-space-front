"use client";

import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import Typed from "typed.js";
import Link from "next/link";

export default function HeroComp() {
  let mystrings;
  mystrings = [""];
  useEffect(() => {
    mystrings.push("  COWORK ?", "  CREATE ?", "  COLLABORATE ?");

    const typed = new Typed(slogan.current, {
      strings: mystrings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mystrings]);
  const slogan = useRef();
  return (
    <section className={styles.container}>
      <div className={styles.img}></div>
      <div className={styles.content1}>
        <div className={styles.slogan__container1}>
          <p className={styles.slogan1}>LOOKING FOR A PLACE TO</p>
          <span className={styles.span_slogan}>
            <span ref={slogan} className={styles.typed1}></span>
          </span>
          <Link href="/spaces" className={styles.btn1}>
            Book your place
          </Link>
        </div>
      </div>
      <div className={styles.img2}></div>
      <div className={styles.content2}>
        <div className={styles.slogan__container2}>
          <p className={styles.slogan2}>DO YOU OWN A PROFFESIONAL</p>
          <span className={styles.typed2}>WORK SPACE?</span>
          <Link href="/spaces" className={styles.btn2}>
            List Your Space
          </Link>
        </div>
      </div>
    </section>
  );
}
