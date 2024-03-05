"use client";

import { useContext, useEffect, useState } from "react";
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
import styles from "./listSpace.module.css";
import { Typography } from "@mui/material";
import useAlertStore from "@/zustand/alertStore";
import { AuthContext } from "@/context/authContext";
import { LoadingButton } from "@mui/lab";
import { addSpace } from "@/fetchData/spaces";
import { getAllCities } from "@/fetchData/city";
import { getCategories } from "@/fetchData/categories";

const ListSpaceModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    cityId: "",
    address: "",
    longitude: "",
    latitude: "",
    description: "",
    categoryId: "",
    email: "",
    status: "Pending",
  });
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      const res = await getAllCities();
      setCities(res.data);
      setLoading(false);
    };

    const fetchCategories = async () => {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data);
      setLoading(false);
    };

    fetchCategories();
    fetchCities();
  }, []);

  const {
    name,
    cityId,
    address,
    longitude,
    latitude,
    description,
    categoryId,
    email,
    status,
  } = formData;

  // error validsation
  const validateFormData = () => {
    if (
      !name ||
      !cityId ||
      !address ||
      !longitude ||
      !latitude ||
      !description ||
      !categoryId ||
      !email ||
      !status
    ) {
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
      const res = await addSpace({
        data: formData,
      });
      if (res.status !== 200) {
        if (res.errorMessage === "User not found") {
          setAlertData({
            message: `User not found 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "Space Not Added") {
          setAlertData({
            message: `Space Not Added 😔!`,
            type: "error",
          });
        } else if (res.errorMessage === "All fields are required") {
          setAlertData({
            message: `All fields are required 😔!`,
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
          message: `Space ${name} is Added Successfuly `,
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
              List Your Sapce
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
              label="Space Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={name}
            />
            <TextField
              fullWidth
              id="filled-basic2"
              label="Your Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">City</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={cityId}
                label="City"
                name="cityId"
                onChange={handleChange}
              >
                {cities &&
                  cities.map((city, index) => {
                    return (
                      <MenuItem key={index} value={city._id}>
                        {city.city}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="filled-basic3"
              label="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              id="filled-basic4"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={categoryId}
                label="Category"
                name="categoryId"
                onChange={handleChange}
              >
                {categories &&
                  categories.map((city, index) => {
                    return (
                      <MenuItem key={index} value={city._id}>
                        {city.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="filled-basic5"
              label="Longitude"
              variant="outlined"
              name="longitude"
              onChange={handleChange}
              value={longitude}
              helperText="Longitude is for the location on the map"
            />
            <TextField
              fullWidth
              id="filled-basic6"
              label="Latitude"
              variant="outlined"
              name="latitude"
              onChange={handleChange}
              value={latitude}
              helperText="Latiude is for the location on the map"
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

export default ListSpaceModal;
