"use client";

import Image from "next/image";
import styles from "./aboutPage.module.css";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

import Accordions from "../accordions/accordions";

export default function AboutUsPage() {
  const data = [
    {
      title: "Listing All Lebanon's Spaces",
      description:
        "Our platform simplifies finding coworking spaces in Lebanon. Users can easily compare options in Tripoli and Beirut, with detailed info on amenities, pricing, and locations.",
      icon: <ChecklistIcon />,
    },
    {
      title: "Effortless Booking Requests",
      description:
        "Our website simplifies coworking space bookings. Users can easily submit inquiries or reservations with just a few clicks. Finding your ideal workspace, whether for a day or a month, has never been easier",
      icon: <ImportContactsIcon />,
    },
    {
      title: "Personalized Filter",
      description:
        "Find your perfect workspace effortlessly. Our platform's smart algorithms tailor recommendations based on your preferences. Say goodbye to endless searching – let us match you with Lebanon's ideal coworking space",
      icon: <FilterListIcon />,
    },
  ];
  return (
    <div className={styles.main}>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>About Us</p>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <div className={styles.mission}>
          <span className={styles.mission_holder}>
            <Image
              className={styles.img1}
              src="/desktop.svg"
              width={400}
              height={400}
              alt="laptop"
            />
            <p className={styles.p}>
              <h2 className={styles.h2_2}>Our Mission</h2>
              <FormatQuoteRoundedIcon className={styles.icon1} />
              <FormatQuoteRoundedIcon className={styles.icon2} />
              {`At CoSpace, we're dedicated to simplifying the search
            for coworking spaces in Lebanon. Our mission is to provide accurate,
            detailed listings that empower individuals and businesses to find
            the perfect workspace. We're committed to fostering inclusivity,
            community, and sustainability within Lebanon's coworking ecosystem`}
            </p>
          </span>
        </div>
        <article className={styles.service_holder}>
          <span className={styles.title_holder}>
            <h2 className={styles.h2}>CoSpace Features</h2>
          </span>
          <span className={styles.line_holder}>
            <div className={styles.line}></div>
            {data.map((service, index) => {
              const middle = index === 1 ? styles.middle : styles.topBottom;
              return (
                <section key={index} className={`${styles.service} ${middle}`}>
                  <span className={styles.right}>
                    <p className={styles.service_title}>
                      {service.icon} {service.title}
                    </p>
                    <p className={styles.description}>{service.description}</p>
                  </span>
                  <Image
                    src="/Polygon.png"
                    width={100}
                    height={100}
                    className={styles.mark}
                    alt="polygon"
                  />
                </section>
              );
            })}
          </span>
        </article>
      </section>
      <section className={styles.faq}>
        <span className={styles.span}>
          <div className={styles.faqLeft}>
            <Image
              src="/FAQs.svg"
              alt="Frequent Asked Question"
              width={300}
              height={300}
            />
          </div>
          <div className={styles.faqRight}>
            <Accordions />
          </div>
          <span className={styles.faq_line1}></span>
          <span className={styles.faq_line2}></span>
        </span>
      </section>
    </div>
  );
}
