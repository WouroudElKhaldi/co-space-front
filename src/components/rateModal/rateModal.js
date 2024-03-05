"use client";
import styles from "./rateModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { addRating } from "@/fetchData/rating";
import useAlertStore from "@/zustand/alertStore";
export function RateModal({
  openRate,
  handleClose,
  spaceID,
  setSuccess,
  setOpenNote,
}) {
  const { user } = useContext(AuthContext);
  const { setAlertData } = useAlertStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: user && user._id,
    spaceId: spaceID,
    message: "",
    rate: null,
  });

  const { rate, message } = formData;

  // error validsation
  const validateFormData = () => {
    if (!rate || !message) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addRating({ data: formData });
      if (res.status !== 200) {
        if (res.errorMessage === "Invalid user ID") {
          setAlertData({
            message: `Invalid user ID 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Invalid space ID") {
          setAlertData({
            message: `Invalid space ID 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "User Not Found") {
          setAlertData({
            message: `User Not Found 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Space Not Found") {
          setAlertData({
            message: `Space Not Found 😔!`,
            type: "error",
          });
        }
        setOpenNote(true);
        setLoading(false);
        handleClose();
      } else {
        console.log("object");
        setLoading(false);
        setSuccess(res);
        setAlertData({
          type: "success",
          message: `Rating added successfuly `,
        });
        setOpenNote(true);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal
        open={openRate}
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
        <motion.Box
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.holder}>
            <div className={styles.title}>
              <p>Rate this Space</p>
              <IconButton
                onClick={() => handleClose()}
                className={styles.close}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form
              onSubmit={(e) => handleAdd(e)}
              action=""
              className={styles.form}
              encType="multipart/form-data"
            >
              <TextField
                fullWidth
                id="filled-basic1"
                label="rate"
                variant="outlined"
                name="rate"
                onChange={handleChange}
                value={formData.rate}
                type="number"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="filled-basic2"
                label="message"
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {loading ? (
                <LoadingButton>Loading ...</LoadingButton>
              ) : (
                <input
                  type="submit"
                  value={"Submit"}
                  className={`${styles.submit__button} ${
                    formValidation === false ? styles.disabled : ""
                  }`}
                  disabled={formValidation === false}
                />
              )}
            </form>
          </div>
        </motion.Box>
      </Modal>
    </>
  );
}
