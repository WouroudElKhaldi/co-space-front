"use client";

import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const { user, LogOut } = useContext(AuthContext);
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDarkFont, setIsDarkFont] = useState(false);

  return (
    // Header Container
    <header
      className={`${styles.headerContainer} ${styles.scrolled} ${
        styles.darkFont
      } 
      ${!nav ? styles.normal : styles.notNormal}
      `}
    >
      <div className={styles.navbar}>
        <Link href="/">
          <div>
            <Image
              src={
                isDarkFont || pathname.includes("spaces/")
                  ? "/logo2.svg"
                  : "/logo.svg"
              }
              width={100}
              height={100}
              alt="Co-Space Logo"
            />
          </div>
        </Link>
        <div className={styles.whatever}>
          <nav style={{ display: "flex", gap: "2rem" }}>
            <ul
              className={
                nav ? [styles.menu, styles.active].join(" ") : [styles.menu]
              }
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {nav ? (
                <span
                  className={`${styles.closeMenu}`}
                  onClick={() => setNav(!nav)}
                >
                  <AiOutlineClose size={25} />
                </span>
              ) : (
                ""
              )}
              <li>
                <Link
                  href="/"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    [
                      "/",
                      "/login",
                      "/signup",
                      "/spaces",
                      "/contactus",
                      "/aboutus",
                      "/events",
                      "/forgot-password",
                    ].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${["/"].includes(pathname) ? styles.activeNavItem : ""}`}
                  onClick={() => setNav(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/spaces"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    [
                      "/",
                      "/login",
                      "/signup",
                      "/spaces",
                      "/contactus",
                      "/aboutus",
                      "/events",
                      "/forgot-password",
                    ].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/spaces"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setNav(false)}
                >
                  Spaces
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    [
                      "/",
                      "/login",
                      "/signup",
                      "/spaces",
                      "/contactus",
                      "/aboutus",
                      "/events",
                      "/forgot-password",
                    ].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/events"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setNav(false)}
                >
                  Events
                </Link>
              </li>

              {/* Link for About Us */}
              <li>
                <Link
                  href="/contactus"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    [
                      "/",
                      "/login",
                      "/signup",
                      "/spaces",
                      "/contactus",
                      "/aboutus",
                      "/events",
                      "/forgot-password",
                    ].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/contactus"].includes(pathname)
                      ? styles.activeNavItem
                      : ""
                  } `}
                  onClick={() => setNav(false)}
                >
                  Contact Us
                </Link>
              </li>

              {/* Link for Contact Us */}
              <li>
                <Link
                  href="/aboutus"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    [
                      "/",
                      "/login",
                      "/signup",
                      "/spaces",
                      "/contactus",
                      "/aboutus",
                      "/events",
                      "/forgot-password",
                    ].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/aboutus"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                  onClick={() => setNav(false)}
                >
                  About Us
                </Link>
              </li>

              {user ? (
                user.role === "Admin" ? (
                  <>
                    <li>
                      <Link
                        href="/dashboard/overview"
                        activeclassname={styles.activeLink}
                        className={`${styles.menuItem} ${
                          [
                            "/",
                            "/login",
                            "/signup",
                            "/spaces",
                            "/contactus",
                            "/aboutus",
                            "/events",
                            "/forgot-password",
                          ].includes(pathname)
                            ? styles.white
                            : styles.black
                        }`}
                        onClick={() => setNav(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <IconButton
                        className={`${styles.logout}`}
                        onClick={(e) => {
                          e.preventDefault();
                          LogOut();
                          router.push("/");
                        }}
                      >
                        <LogoutIcon />
                      </IconButton>
                    </li>
                  </>
                ) : user.role === "Manager" ? (
                  <>
                    <li>
                      <Link
                        href="/dashboard/Manager"
                        activeclassname={styles.activeLink}
                        className={`${styles.menuItem} ${
                          [
                            "/",
                            "/login",
                            "/signup",
                            "/spaces",
                            "/contactus",
                            "/dashboard",
                            "/dashboard/Manager",
                            "/aboutus",
                            "/events",
                            "/forgot-password",
                          ].includes(pathname)
                            ? styles.white
                            : styles.black
                        }`}
                        onClick={() => setNav(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <IconButton
                        className={`${styles.logout}`}
                        onClick={(e) => {
                          e.preventDefault();
                          LogOut();
                          router.push("/");
                        }}
                      >
                        <LogoutIcon />
                      </IconButton>
                    </li>
                  </>
                ) : (
                  <li>
                    <IconButton
                      className={`${styles.logout}`}
                      onClick={(e) => {
                        e.preventDefault();
                        LogOut();
                        router.push("/");
                      }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </li>
                )
              ) : (
                <>
                  <li>
                    <Link
                      className={styles.button}
                      href="/login"
                      onClick={() => setNav(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.button}
                      href="/signup"
                      onClick={() => setNav(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div
            onClick={() => setNav(!nav)}
            className={`${styles.mobile_btn} ${
              [
                "/",
                "/login",
                "/signup",
                "/spaces",
                "/contactus",
                "/aboutus",
                "/events",
                "/forgot-password",
              ].includes(pathname)
                ? styles.white
                : styles.black
            }`}
          >
            {!nav ? <AiOutlineMenu size={25} /> : ""}
          </div>

          {user && (
            <Link href="/profile">
              <Avatar
                alt={user.name}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "lightGrey",
                  color: "#163357",
                  height: "2.2rem",
                  width: "2.2rem",
                }}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
