"use client";

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import Typed from "typed.js";
import Link from "next/link";
import ListSpaceModal from "../listSpace/listSpace";
import useAlertStore from "@/zustand/alertStore";
import DoneModal from "../doneModal/doneModal";
import { AuthContext } from "@/context/authContext";

export default function HeroComp() {
  const { user } = useContext(AuthContext);
  const [openNote, setOpenNote] = useState(false);
  const [openAddSpace, setOpenAddSapce] = useState(false);
  const { alertData, setAlertData } = useAlertStore();

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

  const hanldeOpen = () => {
    if (!user) {
      setAlertData({
        message: "Upss , you're not logged in!",
        type: "error",
      });
      setOpenNote(true);
    } else {
      setOpenAddSapce(true);
    }
  };
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
          <button className={styles.btn2} onClick={() => hanldeOpen()}>
            List Your Space
          </button>
        </div>
      </div>
      <DoneModal />
      <ListSpaceModal
        open={openAddSpace}
        handleClose={() => {
          setOpenAddSapce;
          setAlertData({
            message: "",
            type: "",
          });
        }}
      />
    </section>
  );
}
