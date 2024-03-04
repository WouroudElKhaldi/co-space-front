"use client";

import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DoneModal = ({ type, message, open, handleClose }) => {
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
    alignItems: "left",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  return (
    <main>
      {open && (
        <motion.Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={divStyle}>
              <IconButton
                style={span}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Suspense fallback={<p>Loading icon...</p>}>
                {type === "success" ? (
                  <Image
                    width={180}
                    height={180}
                    src="/done.gif"
                    alt="success"
                  />
                ) : type === "error" ? (
                  <Image
                    width={200}
                    height={200}
                    src="/error.gif"
                    alt="success"
                  />
                ) : (
                  ""
                )}
              </Suspense>
              <p
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  margin: 0,
                }}
              >
                {message}
              </p>
            </div>
          </Box>
        </motion.Modal>
      )}
    </main>
  );
};

export default DoneModal;
