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
import { AuthContext } from "@/context/authContext";
import { addEvent, editEvent } from "@/fetchData/event";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import { getSpacesByUser } from "@/fetchData/spaces";

const EventModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    spaceId: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlertData } = useAlertStore();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25rem",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: "1.5rem",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "##4d6188",
    padding: 0,
  };

  useEffect(() => {
    const fetchSpace = async () => {
      const response = await getSpacesByUser({ userId: user && user.id });
      setSpaces(response.data);
    };
    fetchSpace();
  }, [user]);

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        title: selectedRowData && selectedRowData.title,
        description: selectedRowData && selectedRowData.description,
        spaceId: selectedRowData && selectedRowData.spaceId,
      });
      setStartDate(selectedRowData && selectedRowData.startDate);
      setEndDate(selectedRowData && selectedRowData.endDate);
    }
  }, [selectedRowData, type]);

  const { title, description, spaceId } = formData;

  const validateDateRange = () => {
    if (startDate > endDate) {
      return false;
    } else {
      return true;
    }
  };
  const dateValidation = validateDateRange();

  // error validsation
  const validateFormData = () => {
    if (
      !title ||
      !endDate ||
      !spaceId ||
      !startDate ||
      !description ||
      dateValidation === false
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
      if (type === "add") {
        const res = await addEvent({
          data: formData,
          startDate: startDate,
          endDate: endDate,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Invalid event ID") {
            setAlertData({
              message: `Invalid event ID 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "All fields are required") {
            setAlertData({
              message: `All fields are required 😔!`,
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
            message: `Event: ${res.data.title} has been added successfuly `,
            type: "success",
          });
          setOpenNote(true);
          handleClose();
        }
      } else if (type === "edit") {
        const res = await editEvent({
          id: selectedRowData._id,
          data: formData,
        });
        if (res.status !== 200) {
          if (res.errorMessage === "Invalid event ID") {
            setAlertData({
              message: `Invalid event ID 😔!`,
              type: "error",
            });
          } else if (res.errorMessage === "Event not found") {
            setAlertData({
              message: `Event not found 😔!`,
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
            message: `Event:  ${selectedRowData.title} has been edited successfuly `,
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
        <Box sx={style}>
          <Box style={divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add Event" : "Edit Event"}
            </Typography>
            <IconButton
              style={span}
              className={styles.Edit}
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
            {type === "add" && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label2">Space</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.spaceId}
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
            )}
            <TextField
              fullWidth
              id="filled-basic1"
              label="Title"
              variant="outlined"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              id="filled-basic2"
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    name="startDate"
                    onChange={(value) => setStartDate(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    name="endDate"
                    onChange={(value) => setEndDate(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
            {dateValidation === false && (
              <p className={styles.error}>
                Start date should be bigger than end date
              </p>
            )}
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

export default EventModal;
