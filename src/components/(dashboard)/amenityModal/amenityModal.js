"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import useAlertStore from "@/zustand/alertStore";
import { addAmenity, editAmenity } from "@/fetchData/amenities";

const AmenityModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        name: selectedRowData && selectedRowData.name,
        category: selectedRowData && selectedRowData.category,
        image: selectedRowData && selectedRowData.iamge,
      });
    }
  }, [selectedRowData, type]);

  const { name, category } = formData;

  // error validsation
  const validateFormData = () => {
    if (!name || !category || (type === "add" && !image)) {
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
      if (type === "add") {
        const res = await addAmenity({
          name: name,
          category: category,
          image: image,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Name & category is required") {
            setAlertData({
              message: `Name & category is required 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Please upload an image") {
            setAlertData({
              message: `Please upload an image 😔!`,
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
            message: `Amenity: ${res.data.name} has been added successfuly `,
            type: "success",
          });
          setOpenNote(true);
          handleClose();
        }
      } else if (type === "edit") {
        const res = await editAmenity({
          id: selectedRowData._id,
          data: formData,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Invalid amenity ID") {
            setAlertData({
              message: `Invalid amenity ID 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Amenity not updated") {
            setAlertData({
              message: `Amenity not updated 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Amenity not found") {
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
            message: `Amenity: ${selectedRowData.name} has been edited successfuly `,
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
              {type === "add" ? "Add Amenity" : "Edit Amenity"}
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
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={name}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                name="category"
                onChange={handleChange}
              >
                <MenuItem value={""} disabled>
                  <i>None</i>
                </MenuItem>
                <MenuItem value={"Business Facilities"}>
                  Business Facilities
                </MenuItem>
                <MenuItem value={"Comfort Facilities"}>
                  Comfort Facilities
                </MenuItem>
                <MenuItem value={"Freebies"}>Freebies</MenuItem>
                <MenuItem value={"Parking"}>Parking</MenuItem>
              </Select>
            </FormControl>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
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

export default AmenityModal;
