"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "./carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imagess = [
  { src: "/hero.jpg" },
  { src: "/hero2.jpg" },
  { src: "/login.jpg" },
  { src: "/spacesHero.jpg" },
];

function RightArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`${styles.arrow} ${styles.right_arrow}`}
      onClick={onClick}
    />
  );
}

function LeftArrow() {
  return <div />;
}

function Carousel({ images }) {
  const settings = {
    dots: true,
    pauseOnHover: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  };
  return (
    <div className={styles.slider}>
      <Slider {...settings} className={styles.slider}>
        {imagess.map((img, index) => {
          return (
            <Image
              key={index}
              className={styles.img}
              src={img.src}
              width={100}
              height={100}
              alt={`spaceImage_${index + 1}`}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousel;
