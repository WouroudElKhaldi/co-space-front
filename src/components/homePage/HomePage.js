"use client";
import styles from "./HomePage.module.css";
import Image from "next/image";
import useSpaceStore from "@/zustand/spaceStore";
import { useEffect, useRef, useState } from "react";
import { getAllSpaces, getTopRatedSpaces } from "@/fetchData/spaces";
import SpaceCard from "../spaceCard/spaceCard";
import useAlertStore from "@/zustand/alertStore";
import DoneModal from "../doneModal/doneModal";
import Loading from "../loading/loading";
import ScrollingText from "../scrollText/scrollText";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const { alertData, setAlertData } = useAlertStore();
  const { spacesData, top5Spaces, setTop5Spaces, setSpacesData } =
    useSpaceStore();

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const refVar = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (refVar) {
        observer.unobserve(refVar);
      }
    };
  }, []);

  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await getAllSpaces();
      setSpacesData(res.data);
      setLoading(false);
    };

    const fetchTopSpaces = async () => {
      const res = await getTopRatedSpaces();
      setTop5Spaces(res.data);
      setLoading(false);
    };

    fetchSpaces();
    fetchTopSpaces();
  }, [setSpacesData, setTop5Spaces]);

  useEffect(() => {
    if (alertData.message !== "") {
      setOpenAlert(true);
    }
  }, [alertData]);

  const cityData = [
    { image: "/tripoli.jpg", name: "Tripoli", href: `tripoli` },
    { image: "/beirut.jpg", name: "Beirut", href: `beirut` },
    { image: "/tripoli.jpg", name: "Tripoli", href: `tripoli` },
    { image: "/beirut.jpg", name: "Beirut", href: `beirut` },
  ];

  const Counter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible && count < value) {
        const timeout = setTimeout(() => {
          setCount(count + 1);
        }, 40);
        return () => clearTimeout(timeout);
      }
    }, [count, value]);

    return <span className={styles.map_info_num}>{count}+</span>;
  };

  return (
    <div className={styles.container}>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1.5rem",
        }}
      >
        <span className={styles.h2_holder}>
          <h2 className={styles.h2}>Latest Spaces</h2>
        </span>
        <div className={styles.space_holder}>
          {loading ? (
            <Loading width={"100vw"} height={"50vh"} />
          ) : (
            <>
              {spacesData &&
                spacesData.map((space, index) => {
                  return <SpaceCard data={space} key={index} />;
                })}
            </>
          )}
        </div>
      </section>
      <section className={styles.hero_Container1}>
        <div className={styles.img1}></div>
        <div className={styles.content1}>
          <div className={styles.slogan__container1}>
            <h2>Remote Worker?</h2>
            <ul>
              <li>{`Find the perfect workspace hassle-free with CoSpace's streamlined reservation process`}</li>
              <li>
                Explore a variety of coworking spaces across Lebanon with just a
                few clicks.
              </li>
              <li>
                Reserve your spot anytime, anywhere, whether you need a desk for
                a day or a dedicated office for a month.
              </li>
              Enjoy a seamless booking experience and say goodbye to tedious
              processes.
              <li>
                Access exclusive perks and discounts to make your coworking
                experience even more rewarding.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1.5rem",
        }}
      >
        <span className={styles.h2_holder}>
          <h2 className={styles.h2}>Top Rated Spaces</h2>
        </span>
        <div className={styles.space_holder}>
          {loading ? (
            <Loading height={"50vh"} width={"100vw"} />
          ) : (
            <>
              {spacesData &&
                spacesData.map((space, index) => {
                  return <SpaceCard data={space} key={index} />;
                })}
            </>
          )}
        </div>
      </section>
      <section className={styles.hero_Container2}>
        <div className={styles.img2}></div>
        <div className={styles.content2}>
          <div className={styles.slogan__container2}>
            <h2>Own a Coworking Space?</h2>

            <ul>
              <li>
                Showcase your coworking space to a broader audience in Lebanon
                with CoSpace.
              </li>
              <li>
                Connect instantly with entrepreneurs seeking a place to work by
                adding your venue to our platform.
              </li>
              <li>
                Gain visibility and attract new clients by adding amenities,
                pricing, and location on our user-friendly interface.
              </li>
              <li>
                {`Access a fully functional dashboard to manage your space's
                information and handle user requests with ease.`}
              </li>
              <li>
                Join our network of coworking spaces today and elevate your
                visibility in the Lebanese market with CoSpace.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <span className={styles.mapHolder}>
        <div className={styles.mapLeft}>
          <h2 className={styles.map_H2}>
            Uncover Your Ideal Place To <span> CoWork</span>
          </h2>
          <div className={styles.p_holder}>
            <p>
              {`Embark on a journey of discovery as you navigate Lebanon's dynamic
            coworking scene with our intuitive map. From the bustling energy of
            Beirut to the serene coastal towns, immerse yourself in a world of
            endless possibilities. Our platform empowers you to find the perfect
            workspace that resonates with your vibe and fuels your creativity.
            `}
            </p>
            <p>
              {`Dive into a vibrant community of innovators, where collaboration
            knows no bounds and inspiration is always within reach. Say goodbye
            to the mundane and hello to a workspace that sparks your passion.
            Join us today and let's redefine the way you work, one city at a
            time.`}
            </p>
          </div>
          <div ref={containerRef} className={styles.map_info_holder}>
            <div className={styles.map_info_card}>
              <Counter value={50} />
              <p>Cities</p>
            </div>
            <div className={styles.map_info_card}>
              <Counter value={120} />
              <p>Spaces</p>
            </div>
          </div>
        </div>
        <div className={styles.mapRight}>
          <Image
            src={"/lebanonMap.png"}
            alt="Lebanon map"
            width={800}
            height={500}
            className={styles.map}
          />
          <div className={`${styles.mapCard} ${styles.one}`}>
            <span className={styles.cardHead}></span>
            <span className={styles.cardBody}>
              <p className={styles.card_title}>Beirut</p>
              <p className={styles.cardNumber}>23 Spaces</p>
            </span>
          </div>
          <div className={`${styles.mapCard} ${styles.two}`}>
            <span className={styles.cardHead}></span>
            <span className={styles.cardBody}>
              <p className={styles.card_title}>Tripoli</p>
              <p className={styles.cardNumber}>20 Spaces</p>
            </span>
          </div>
          <div className={`${styles.mapCard} ${styles.three}`}>
            <span className={styles.cardHead}></span>
            <span className={styles.cardBody}>
              <p className={styles.card_title}>Saida</p>
              <p className={styles.cardNumber}>15 Spaces</p>
            </span>
          </div>
          <div className={`${styles.mapCard} ${styles.four}`}>
            <span className={styles.cardHead}></span>
            <span className={styles.cardBody}>
              <p className={styles.card_title}>{"Ba'albak"}</p>
              <p className={styles.cardNumber}>6 Spaces</p>
            </span>
          </div>
          <div className={`${styles.mapCard} ${styles.five}`}>
            <span className={styles.cardHead}></span>
            <span className={styles.cardBody}>
              <p className={styles.card_title}>Batroun</p>
              <p className={styles.cardNumber}>8 Spaces</p>
            </span>
          </div>
        </div>
      </span>
      <div className={styles.scroll}>
        <div className={styles.img}></div>
        <ScrollingText>CoSpace CoSpace CoSpace CoSpace CoSpace</ScrollingText>
      </div>

      <DoneModal
        open={openAlert}
        type={alertData.type}
        message={alertData.message}
        handleClose={() => setOpenAlert(false)}
      />
    </div>
  );
}
