"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import useAlertStore from "@/zustand/alertStore";
import { addCity, editCity } from "@/fetchData/city";
import { LoadingButton } from "@mui/lab";

const CityModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    if (type === "edit") {
      setCity(selectedRowData && selectedRowData.city);
    }
  }, [selectedRowData, type]);

  // error validsation
  const validateFormData = () => {
    if (!city) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "add") {
        const res = await addCity({
          city: city,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "City name is required") {
            setAlertData({
              message: `City name is required 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "City Already Exists") {
            setAlertData({
              message: `City Already Exists 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Amenity not added") {
            setAlertData({
              message: `Amenity not added 😔!`,
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
            message: `City: ${res.data.name} has been added successfuly `,
            type: "success",
          });
          setOpenNote(true);
          handleClose();
        }
      } else if (type === "edit") {
        const res = await editCity({
          id: selectedRowData._id,
          city: city,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Invalid city ID") {
            setAlertData({
              message: `Invalid city ID 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "City not found") {
            setAlertData({
              message: `City not found 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "City Already Exists") {
            setAlertData({
              message: `City Already Exists 😔!`,
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
            message: `City: ${selectedRowData.name} has been edited successfuly `,
          });
          handleClose();
        }
        setOpenNote(true);
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
              {type === "add" ? "Add City" : "Edit City"}
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
              id="filled-basic3"
              label="City"
              variant="outlined"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
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

export default CityModal;
