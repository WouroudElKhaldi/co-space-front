"use client";

import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OAuth from "../oAuth/oAuth";
import { LoginFunction } from "@/fetchData/auth";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import useAlertStore from "@/zustand/alertStore";
import { LoadingButton } from "@mui/lab";
import DoneModal from "../doneModal/doneModal";
import { motion } from "framer-motion";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export default function LoginComp() {
  const { alertData, setAlertData } = useAlertStore();
  const router = useRouter();
  const { fetchUserData } = useContext(AuthContext);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [error, setError] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const validateFormData = () => {
    if (!email || !password) {
      return false;
    } else {
      return true;
    }
  };
  const formValidation = validateFormData();

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setEmailValid(true);
    setPasswordValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate email and password before submitting
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid) {
      setEmailValid(false);
      setLoading(false);
    }
    if (!isPasswordValid) {
      setPasswordValid(false);
      setLoading(false);
    }

    if (isEmailValid && isPasswordValid) {
      const res = await LoginFunction(formData);
      if (res.status !== 200) {
        if (res.errorMessage === "All fields are required") {
          setAlertData({
            message: `All fields are required 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Invalid Email") {
          setAlertData({
            message: `Invalid Email 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Invalid Password") {
          console.log("error password");
          setAlertData({
            message: `Invalid Password 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "User not verified yet") {
          setAlertData({
            message: `Your account is not verified yet 😔!`,
            type: "error",
          });
        }
        setOpenNote(true);
        setLoading(false);
      } else {
        await fetchUserData();
        setLoading(false);
        setAlertData({
          message: "Logged in successfuly 😁!",
          type: "success",
        });
        router.push("/");
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        variant="main"
        component={"main"}
        className={styles.main}
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
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100vw" }}
          transition={{ duration: 0.5 }}
          className={styles.content__wrapper}
        >
          <div className={styles.content}>
            <div className={styles.info}>
              <h1 className={styles.title}>Log in to your account</h1>
              <p className={styles.slogan}>
                {"Don't have an ccount? "}
                <Link href={"/signup"} className={styles.signup__link}>
                  Sign up
                </Link>
              </p>
              {error && (
                <p style={{ color: "red", fontWeight: "800" }}>
                  An error occured
                </p>
              )}
            </div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              action=""
              className={styles.form}
              encType="multipart/form-data"
            >
              <TextField
                fullWidth
                id="filled-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                error={!emailValid}
                helperText={!emailValid && "Invalid email"}
              />
              <span>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    error={!passwordValid}
                  />
                </FormControl>
                {!passwordValid && (
                  <p className={styles.error}>
                    Password must be 8 digits, 1 Lowercase, 1 Uppercase, 1
                    number and 1 special character
                  </p>
                )}
              </span>
              <p className={styles.forgot}>
                <Link href={"/verify"}>Verify Account</Link>
                <Link href={"/forgot-password"}>Forgot your password ?</Link>
              </p>

              {loading ? (
                <LoadingButton>Loding ....</LoadingButton>
              ) : (
                <input
                  type="submit"
                  value={"Log in"}
                  className={`${styles.submit__button} ${
                    formValidation === false ? styles.disabled : ""
                  }`}
                  disabled={formValidation === false}
                />
              )}
              <div className={styles.or__hr}>
                <hr />
                <span className={styles.or__wrapper}>or</span>
              </div>
              <div className={styles.oauth}>
                <OAuth isLogin={true} />
              </div>
            </form>
          </div>
        </motion.Box>
      </Box>
      <DoneModal
        type={alertData.type}
        message={alertData.message}
        open={openNote}
        handleClose={() => setOpenNote(false)}
      />
    </>
  );
}
