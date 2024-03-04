"use client";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "./contactPage.module.css";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { contactUs } from "@/fetchData/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    message: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    subject: "",
    recieverName: "Wouroud El Khaldi",
    recieverEmail: "wouroudelkhaldi@gmail.com",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contactUs(formData);
    resetForm(e);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormData({
      message: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      company: "",
      subject: "",
      recieverName: "Wouroud El Khaldi",
      recieverEmail: "wouroudelkhaldi@gmail.com",
    });
  };

  return (
    <>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>Contact Us</p>
          </div>
        </div>
      </section>
      <Box
        className={styles.contact_holder}
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #d28d48 !important",
            borderRadius: "4px",
            bgcolor: "transparent !important",
          },
          // "& .MuiOutlinedInput-notchedOutline": {
          //   border: "2px solid #ededf5 ",
          // },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#d28d48",
            fontSize: "1.1rem",
            fontWeight: "500",
          },
          // "& . -root": {
          //   color: "#ededf5",
          // },
          // "& .MuiFormControl-root > label": {
          //   color: "#ededf5",
          // },
        }}
      >
        <div className={styles.left}>
          <span>
            <h1 className={styles.h1}>Contact Information</h1>
            <p className={styles.p}>Say something to start a live chat!</p>
          </span>
          <ul className={styles.ul1}>
            <li className={styles.li}>
              <PhoneIcon />
              +961 00 000 000{" "}
            </li>
            <li className={styles.li}>
              <EmailIcon />
              example@gmail.com
            </li>
            <li className={styles.li}>
              <LocationOnIcon />
              132 Dartmouth Street Boston
            </li>
          </ul>
          <ul className={styles.ul2}>
            <div className={`${styles.circle} ${styles.small}`}></div>
            <div className={`${styles.circle} ${styles.big}`}></div>
            <li className={styles.li2}>
              <FacebookRoundedIcon className={styles.icon} />
            </li>
            <li className={styles.li2}>
              <WhatsAppIcon className={styles.icon} />
            </li>
            <li className={styles.li2}>
              <InstagramIcon className={styles.icon} />
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              name="fullName"
              onChange={handleChange}
              className={styles.input}
            />
            <TextField
              id="outlined-basic1"
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              className={styles.input}
            />
            <TextField
              id="outlined-basic2"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              onChange={handleChange}
              className={styles.input}
            />
            <TextField
              id="outlined-basic3"
              label="Company"
              variant="outlined"
              name="company"
              onChange={handleChange}
              className={styles.input}
            />
            <span className={styles.input_holder2}>
              <TextField
                id="outlined1"
                label="Subject"
                variant="outlined"
                name="subject"
                onChange={handleChange}
                className={styles.input2}
              />
              <TextField
                id="outlined2"
                label="Message"
                variant="outlined"
                name="message"
                onChange={handleChange}
                multiline
                rows={6}
                className={styles.input2}
              />
            </span>
            <button type="submit" className={styles.button}>
              {" "}
              Send Message
            </button>
          </form>
        </div>
      </Box>
    </>
  );
}
