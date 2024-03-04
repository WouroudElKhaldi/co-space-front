"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../userModal/userModal.module.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { deleteSpace } from "@/fetchData/spaces";

const DeleteSpaceModal = ({
  setOpenNote,
  openDelete,
  handleClose,
  selectedRowData,
  setSuccessDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20rem",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: "1.5rem",
    borderRadius: "15px",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "16rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "##4d6188",
    padding: 0,
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteSpace({ spaceId: selectedRowData._id });
      setLoading(false);
      setError(false);
      setSuccessDelete(response);
      handleClose();
      setOpenNote({
        open: true,
        status: "success",
        message: `${
          selectedRowData && selectedRowData.name
        } has been deleted successfuly `,
      });
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
        <Box sx={style}>
          <div style={divStyle}>
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
              style={span}
              className={styles.Edit}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="p" component="p" mb="1rem">
            Are you sure you want to delete{" "}
            {selectedRowData && selectedRowData.name} ??
          </Typography>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            size="large"
            onClick={handleDelete}
            sx={{
              bgcolor: "#4d6188 !important",
              ":hover": {
                bgcolor: "#6f84ae !important",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteSpaceModal;
