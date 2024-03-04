"use client";

import styles from "./footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import Image from "next/image";

function Footer({ width }) {
  return (
    <footer
      className={`${styles.footer}`}
      style={{
        width: width,
      }}
    >
      <div className={styles.top}>
        <div className={styles.links}>
          <div className={styles.linksColumn}>
            <Image src={"/logo2.svg"} width={80} height={80} alt="CoSpace" />
            <p className={styles.p}>
              Explore the essence of Lebanon with our authentic spices,
              delivered worldwide for a flavorful journey in every dish.
            </p>
            <div className={styles.socials}>
              <Link href="www.facebook.com" className={`${styles.socialIcon}`}>
                <FacebookRoundedIcon />
              </Link>
              <Link href="www.Instagram.com" className={`${styles.socialIcon}`}>
                <InstagramIcon />
              </Link>
              <Link href="" className={`${styles.socialIcon}`}>
                <WhatsAppIcon />
              </Link>
            </div>
          </div>
          <div className={`${styles.linksColumn} ${styles.middle}`}>
            <p className={styles.h2}>Pages</p>
            <Link href={"/"} className={styles.link}>
              Home
            </Link>
            <Link className={styles.link} href={"/spaces"}>
              Spaces
            </Link>
            <Link className={styles.link} href={"/events"}>
              Events
            </Link>
            <Link className={styles.link} href={"/aboutus"}>
              About Us
            </Link>
          </div>
          <div className={`${styles.linksColumn} ${styles.right}`}>
            <p className={styles.h2}>Help</p>
            <Link className={styles.link} href={"/Profile"}>
              My Account
            </Link>
            <Link className={styles.link} href={"/login"}>
              Login
            </Link>
            <Link className={styles.link} href={"/signup"}>
              Sign Up
            </Link>
            <Link className={styles.link} href={"/PrivacyPolicy"}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>© 2024 All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
