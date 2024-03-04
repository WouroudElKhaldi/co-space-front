"use client";

import styles from "../login/login.module.css";
import { useContext, useEffect, useState } from "react";
import { Box, TextField, Link } from "@mui/material";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { RecoverPassword, ResetPassword } from "@/fetchData/auth";
import useAlertStore from "@/zustand/alertStore";
import DoneModal from "../doneModal/doneModal";
import { motion } from "framer-motion";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const ForgotComp = () => {
  const { setAlertData, alertData } = useAlertStore();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    userCode: "",
    resetCode: "",
    password: "",
  });
  const [code, setCode] = useState(Array(8).fill(""));
  const [passwrordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [codeValid, setCodeValid] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [openNote, setOpenNote] = useState(false);

  const handleCodeChange = (index) => (event) => {
    const { value } = event.target;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      userCode: newCode.join(""),
    }));

    if (newCode.join("").length === 8) {
      setCodeValid(true);
    }
    const resetCode = localStorage.getItem("resetCode");
    setFormData((prevFormData) => ({
      ...prevFormData,
      resetCode: resetCode,
    }));
  };

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setEmailValid(true);
    setPasswordValid(true);
  };

  // error validsation
  const validateEmail = (email) => {
    // Basic email validation
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
  };

  const validateCode = (code) => {
    return code.length === 8 && /[a-zA-Z]/.test(code);
  };

  const validateFormData = () => {
    if (!formData.userCode || !formData.email || !formData.password) {
      return false;
    }

    if (formData.userCode.length < 8) {
      return false;
    }

    if (
      validateCode(formData.userCode) === false ||
      validateEmail(formData.email) === false ||
      validatePassword(formData.password) === false
    ) {
      return false;
    }
    return true;
  };

  const formValidation = validateFormData();

  const generateRandomString = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    let result = "";
    for (let i = 0; i < 8; i++) {
      result +=
        Math.random() < 0.5
          ? letters.charAt(Math.floor(Math.random() * letters.length))
          : numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    // Perform validation before submission
    const isEmailValid = validateEmail(formData.email);

    if (!isEmailValid) {
      setEmailValid(false);
    }

    if (emailValid) {
      const code = generateRandomString();
      // Set the code in localStorage
      localStorage.setItem("resetCode", code);

      // Remove the item after one hour
      setTimeout(() => {
        localStorage.removeItem("resetCode");
      }, 3600000);

      const res = await RecoverPassword({ email: formData.email, code: code });
      if (res.status !== 200) {
        setError(true);
      } else {
        setSentEmail(true);
      }
    } else {
      alert("Please fill in the form correctly.");
    }
  };

  const isCodeValid = validateCode(formData.userCode);
  const isEmailValid = validateEmail(formData.email);

  const hanldeReset = async (e) => {
    e.preventDefault();

    // Retrieve the resetCode from localStorage
    const resetCode = localStorage.getItem("resetCode");

    if (!resetCode) {
      setAlertData({
        type: "error",
        message: "Reset Code has expired",
      });
      setOpenNote(true);
      return;
    }

    if (!isEmailValid) {
      setEmailValid(false);
    }
    if (!isCodeValid) {
      setCodeValid(false);
    }

    if (resetCode !== formData.userCode) {
      setAlertData({
        type: "error",
        message: "Incorrect Code ",
      });
      setOpenNote(true);
      return;
    }

    if (emailValid && codeValid) {
      const res = await ResetPassword({
        email: formData.email,
        password: formData.password,
        resetCode: formData.resetCode,
        userCode: formData.userCode,
      });
    }
  };

  return (
    <Box
      variant="main"
      component={"main"}
      className={`${styles.main}`}
      sx={{
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "2px solid #d28d48 !important",
          borderRadius: "4px",
          bgcolor: "transparent !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #ededf5 ",
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused ": {
          color: "#d28d48",
          fontSize: "1.1rem",
          fontWeight: "500",
        },
        "& .MuiSvgIcon-root": {
          color: "#ededf5",
        },
        "& .MuiFormControl-root > label": {
          color: "#ededf5",
          fontWeight: 550,
        },
        ".MuiFormHelperText-root.Mui-error": {
          color: "#8B0000",
        },
        "& .Mui-error > fieldset ": {
          border: "2px solid #8B0000 !important",
        },
        ".MuiInputBase-input.MuiOutlinedInput-input": {
          color: "white",
        },
      }}
    >
      <motion.Box
        key={sentEmail ? "sent" : "not-sent"}
        initial={{ opacity: 0, x: "-100vw" }} // Initial position off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Move in and fade in
        exit={{ opacity: 0, x: "100vw" }} // Move out to the right and fade out
        transition={{ duration: 0.5 }} // Animation duration
        className={`${styles.content__wrapper} ${styles.forgotPage} ${
          sentEmail && styles.eighty
        }`}
      >
        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.title}>Forgot your password ?</h1>
            <p className={styles.slogan}>
              Already know your password?
              <Link href={"/login"} className={styles.signup__link}>
                Log in
              </Link>
            </p>
            {error && (
              <p style={{ color: "red", fontWeight: "800" }}>
                An error occured
              </p>
            )}
          </div>
          {!sentEmail ? (
            <form
              onSubmit={(e) => handleRecover(e)}
              action=""
              className={styles.form}
            >
              <p
                style={{
                  color: "white",
                }}
              >
                Please submit your email to recieve a reset code
              </p>
              <TextField
                fullWidth
                id="filled-basic"
                label="Email"
                variant="outlined"
                name="email"
                sx={{
                  fontFamily: "Arial !important",
                }}
                onChange={handleChange("email")}
                error={!emailValid}
                helperText={!emailValid && "Invalid email"}
              />
              <input
                type="submit"
                value={"Send Code"}
                className={`${styles.submit__button} ${
                  !isEmailValid ? styles.disabled : ""
                }`}
                disabled={!isEmailValid}
              />
            </form>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.form}
              onSubmit={(e) => hanldeReset(e)}
            >
              <p
                style={{
                  color: "white",
                }}
              >
                Please fill out this input with the code sent to your email
              </p>
              <TextField
                fullWidth
                id="filled-basic"
                label="Password"
                variant="outlined"
                name="password"
                sx={{
                  fontFamily: "Arial !important",
                }}
                onChange={handleChange("password")}
                error={!passwrordValid}
                helperText={!passwrordValid && "Invalid password"}
              />
              <span className={styles.verify_holder}>
                <p className={styles.code_label}>Verification Code:</p>
                <div className={styles.code_holder}>
                  {code.map((digit, index) => (
                    <TextField
                      key={index}
                      name={`digit${index + 1}`}
                      type="text"
                      className={styles.code_input_many}
                      value={digit}
                      onChange={handleCodeChange(index)}
                      inputProps={{ maxLength: 1 }}
                    />
                  ))}
                </div>
                <TextField
                  type="text"
                  name={`digit${0}`}
                  value={formData.code}
                  onChange={handleCodeChange(0)}
                  inputProps={{ maxLength: 8 }}
                  className={styles.code_input_single}
                />
                <p className={styles.code_note}>
                  {!codeValid
                    ? "Code must be 8 digits and must have at least on letter"
                    : "Valid code, you can now verify"}
                </p>
              </span>
              <input
                type="submit"
                value={"Reset"}
                className={`${styles.submit__button} ${
                  !formValidation ? styles.disabled : ""
                }`}
                disabled={!formValidation}
              />
            </motion.form>
          )}
        </div>
      </motion.Box>
      <DoneModal
        type={alertData.type}
        message={alertData.message}
        open={openNote}
        handleClose={() => setOpenNote(false)}
      />
    </Box>
  );
};

export default ForgotComp;
