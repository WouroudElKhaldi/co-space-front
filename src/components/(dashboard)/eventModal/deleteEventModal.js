"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useAlertStore from "@/zustand/alertStore";
import { deleteEvent } from "@/fetchData/event";
import { LoadingButton } from "@mui/lab";

const DeleteEventModal = ({
  setOpenNote,
  openDelete,
  handleClose,
  selectedRowData,
  setSuccessDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setAlertData } = useAlertStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteEvent({ id: selectedRowData._id });
      setLoading(false);
      setError(false);
      setSuccessDelete(response);
      setAlertData({
        type: "success",
        message: `${selectedRowData.title} has been deleted successfuly `,
      });
      setOpenNote(true);
      handleClose();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.div}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Alert
            </Typography>
            <IconButton
              className={styles.span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="p" component="p" mb="1rem">
            Are you sure you want to delete{" "}
            {selectedRowData && selectedRowData.title} ??
          </Typography>
          {loading ? (
            <LoadingButton>Loading ...</LoadingButton>
          ) : (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              size="large"
              onClick={handleDelete}
              sx={{
                bgcolor: "#4d6188 !important",
                color: "#fff",
                ":hover": {
                  bgcolor: "#6f84ae !important",
                },
              }}
            >
              Delete
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DeleteEventModal;
