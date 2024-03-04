"use client";

import styles from "../login/login.module.css";
import { useContext, useState } from "react";
import { Box, TextField, Link } from "@mui/material";
import { VerifyFunction } from "@/fetchData/auth";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const VerifyComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const router = useRouter();
  const { user, fetchUserData, LogOut } = useContext(AuthContext);
  const [code, setCode] = useState(Array(8).fill(""));
  const [error, setError] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [codeValid, setCodeValid] = useState(false);

  const handleChange = (index) => (event) => {
    const { value } = event.target;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      code: newCode.join(""),
    }));

    if (newCode.join("").length === 8) {
      setCodeValid(true);
    }
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: value,
    }));
    setEmailValid(true);
  };

  // error validsation
  const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCode = (code) => {
    return code.length === 8 && /[a-zA-Z]/.test(code);
  };

  const validateFormData = () => {
    if (!formData.code || !formData.email) {
      return false;
    }

    if (formData.code.length < 8) {
      return false;
    }

    if (validateCode(formData.code) === false) {
      return false;
    }
    return true;
  };

  const formValidation = validateFormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation before submission
    const isCodeValid = validateCode(formData.code);
    const isEmailValid = validateEmail(formData.email);

    if (!isEmailValid) {
      setEmailValid(false);
    }
    if (!isCodeValid) {
      setCodeValid(false);
    }

    if (emailValid && codeValid) {
      const res = await VerifyFunction(formData);
      await fetchUserData();
      if (res.status !== 200) {
        setError(true);
      } else {
        if (user !== null) {
          await LogOut();
        }
        router.push("/");
      }
    } else {
      alert("Please fill in the form correctly.");
    }
  };

  return (
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
            <h1 className={styles.title}>Verify your account</h1>
            <p className={styles.slogan}>
              Already verified your accoun?
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
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleEmailChange}
              error={!emailValid}
              helperText={!emailValid && "Invalid email"}
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
                    onChange={handleChange(index)}
                    inputProps={{ maxLength: 1 }}
                  />
                ))}
              </div>
              <TextField
                type="text"
                name={`digit${0}`}
                value={formData.code}
                onChange={handleChange(0)}
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
              value={"Verify"}
              className={`${styles.submit__button} ${
                !formValidation ? styles.disabled : ""
              }`}
              disabled={!emailValid || !codeValid}
            />
          </form>
        </div>
      </motion.Box>
    </Box>
  );
};

export default VerifyComp;
