"use client";

import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import useAlertStore from "@/zustand/alertStore";
import { AuthContext } from "@/context/authContext";
import { LoadingButton } from "@mui/lab";
import { editRating } from "@/fetchData/rating";

const RatingModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    rate: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        rate: selectedRowData && selectedRowData.rate,
        message: selectedRowData && selectedRowData.message,
      });
    }
  }, [selectedRowData, type]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editRating({
        id: selectedRowData._id,
        data: formData,
      });
      if (res.status !== 200) {
        if (res.errorMessage === "Invalid rating ID") {
          setAlertData({
            message: `Invalid rating ID 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Rating not found") {
          setAlertData({
            message: `Rating not found 😔!`,
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
          message: `Rating for this space  ${selectedRowData.spaceId.name} has been edited successfuly `,
        });
        handleClose();
      }
      setOpenNote(true);
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
        aria-labelledby="modal-modal-rate"
        aria-describedby="modal-modal-message"
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
              Edit Rating
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
        </Box>
      </Modal>
    </>
  );
};

export default RatingModal;
