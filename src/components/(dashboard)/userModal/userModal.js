"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./userModal.module.css";
import { Typography } from "@mui/material";
import { addUser, editUser } from "@/fetchData/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAlertStore from "@/zustand/alertStore";

const UserModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    phoneNumber: "",
    status: "",
    image: "",
  });
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        fullName: selectedRowData && selectedRowData.fullName,
        role: selectedRowData && selectedRowData.role,
        email: selectedRowData && selectedRowData.email,
        password: "",
        phoneNumber: selectedRowData && selectedRowData.phoneNumber,
        status: selectedRowData && selectedRowData.status,
        image: selectedRowData && selectedRowData.iamge,
      });
    }
  }, [selectedRowData, type]);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const { fullName, email, password, role, phoneNumber, status, image } =
    formData;

  // error validsation
  const validateFormData = () => {
    if (!fullName || !email || !phoneNumber || !role || !status) {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
  };

  const formValidation = validateFormData();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  ////

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

    // If password is provided, validate it; otherwise, consider it valid
    const isPasswordValid =
      type === "add"
        ? validatePassword(formData.password)
        : type === "edit" && formData.password
        ? validatePassword(formData.password)
        : true;
    if (!isEmailValid) {
      setEmailValid(false);
      setLoading(false);
    }
    if (formData.password && !isPasswordValid) {
      setPasswordValid(false);
      setLoading(false);
    }

    try {
      if (isEmailValid && isPasswordValid) {
        if (type === "add") {
          const res = await addUser({
            role: formData.role,
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            image: image,
            status: formData.status,
          });
          if (res.status !== 200) {
            if (res.errorMessage === "All fields are required") {
              setAlertData({
                message: `All fields are required 😔!`,
                type: "error",
              });
            } else if (res.errorMessage === "Email already exists") {
              setAlertData({
                message: `Email already exists 😔!`,
                type: "error",
              });
            }
            setOpenNote(true);
            handleClose();
            setLoading(false);
            setSuccess(res);
            return;
          } else {
            setLoading(false);
            setError(false);
            setSuccess(res);
            setAlertData({
              message: `User ${res.data.fullName} has been added successfuly `,
              type: "success",
            });
            setOpenNote(true);
            handleClose();
          }
        } else if (type === "edit") {
          const res = await editUser({
            id: selectedRowData._id,
            data: formData,
          });
          if (res.status !== 200) {
            if (res.errorMessage === "All fields are required") {
              setAlertData({
                message: `All fields are required 😔!`,
                type: "error",
              });
            } else if (res.errorMessage === "Invalid password") {
              setAlertData({
                message: `Invalid password 😔!`,
                type: "error",
              });
            } else if (res.errorMessage === "User not found") {
              setAlertData({
                message: `User not found 😔!`,
                type: "error",
              });
            }
            handleClose();
            setLoading(false);
          } else {
            setLoading(false);
            setError(false);
            setSuccess(res);
            setAlertData({
              type: "success",
              message: `User ${selectedRowData.fullName} has been edited successfuly `,
            });
            handleClose();
          }
          setOpenNote(true);
        }
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #d28d48 !important",
            borderRadius: "4px",
            bgcolor: "transparent !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid gray ",
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#d28d48",
            fontSize: "1.1rem",
            fontWeight: "500",
          },
          "& .MuiSvgIcon-root": {
            color: "gray",
          },
          "& .MuiFormControl-root > label": {
            color: "gray",
          },
          ".MuiFormHelperText-root.Mui-error": {
            color: "#8B0000",
          },
          "& .Mui-error > fieldset ": {
            border: "2px solid #8B0000 !important",
          },
        }}
      >
        <Box className={styles.modal}>
          <Box className={styles.div}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add User" : "Edit User"}
            </Typography>
            <IconButton
              className={styles.span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <form
            onSubmit={(e) => handleSubmit(e)}
            action=""
            className={styles.form}
            encType="multipart/form-data"
          >
            <TextField
              fullWidth
              id="filled-basic1"
              label="FullName"
              variant="outlined"
              name="fullName"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
              value={formData.fullName}
            />
            <span>
              <TextField
                fullWidth
                id="filled-basic2"
                label="Email"
                variant="outlined"
                name="email"
                sx={{
                  fontFamily: "Arial !important",
                }}
                value={formData.email}
                onChange={handleChange}
                error={!emailValid}
              />
              {!emailValid && <p className={styles.error}>Invalid Email</p>}
            </span>

            <TextField
              fullWidth
              id="filled-basic3"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
              value={formData.phoneNumber}
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
                  Password must be 8 digits, 1 Lowercase, 1 Uppercase, 1 number
                  and 1 special character
                </p>
              )}
            </span>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={""} disabled>
                  <i>None</i>
                </MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={formData.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={""} disabled>
                  <i>None</i>
                </MenuItem>
                <MenuItem value={"Verified"}>Verified</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </FormControl>
            <input type="file" name="" id="" />
            <input
              type="submit"
              value={"Submit"}
              className={`${styles.submit__button} ${
                formValidation === false ? styles.disabled : ""
              }`}
              disabled={formValidation === false}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;
