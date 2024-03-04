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
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import useAlertStore from "@/zustand/alertStore";
import { addRule, editRule } from "@/fetchData/rule";
import { getAllSpaces, getSpacesByUser } from "@/fetchData/spaces";
import { AuthContext } from "@/context/authContext";

const RuleModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    spaceId: "",
  });
  const [spaces, setSpaces] = useState([]);
  const [image, setImage] = useState();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        name: selectedRowData && selectedRowData.name,
        spaceId: selectedRowData && selectedRowData.spaceId,
      });
    }
  }, [selectedRowData, type]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await getSpacesByUser({ userId: user.id });
      setSpaces(res.data);
    };

    const fetchAllSpaces = async () => {
      const res = await getAllSpaces();
      setSpaces(res.data);
    };
    if (user && user.role === "Admin") {
      fetchAllSpaces();
    } else if (user && user.role === "Manager") {
      fetchSpaces();
    }
  }, [user]);

  const { name, spaceId } = formData;

  // error validsation
  const validateFormData = () => {
    if (!name || !spaceId || !image) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();
  console.log(formValidation);

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
        const res = await addRule({
          name: name,
          spaceId: spaceId,
          image: image,
        });
        if (res.status !== 200) {
          console.log("object");

          if (res.errorMessage === "All fields are required") {
            setAlertData({
              message: `All fields are required 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Invalid Space ID") {
            setAlertData({
              message: `Invalid Space ID 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Space Not Found") {
            setAlertData({
              message: `Space Not Found 😔!`,
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
            message: `Rule has been added successfuly `,
            type: "success",
          });
          setOpenNote(true);
          handleClose();
        }
      } else if (type === "edit") {
        console.log("object2");

        const res = await editRule({
          id: selectedRowData._id,
          name: name,
          image: image,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Invalid Rule ID") {
            setAlertData({
              message: `Invalid Rule ID 😔!`,
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
            message: `Rule has been edited successfuly `,
          });
          handleClose();
        }
        setOpenNote(true);
      } else {
        console.log("object3");
      }
    } catch (error) {
      console.log(error);
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
              {type === "add" ? "Add Rule" : "Edit Rule"}
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
              label="Name"
              variant="outlined"
              name="name"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
              value={formData.name}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Space</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={formData.status}
                label="Space"
                name="spaceId"
                onChange={handleChange}
              >
                {spaces &&
                  spaces.map((space, index) => {
                    return (
                      <MenuItem key={index} value={space._id}>
                        {space.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <input
              type="file"
              name="image"
              id=""
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

export default RuleModal;
