"use client";
import styles from "./imageModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
export function ImageModal({ openImage, handleClose, image }) {
  return (
    <>
      <Modal
        open={openImage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.Box
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.img_container}>
            <IconButton onClick={() => handleClose()} className={styles.close}>
              <CloseIcon />
            </IconButton>
            <Image
              src={image}
              width={200}
              height={200}
              alt="image"
              className={styles.img}
            />
          </div>
        </motion.Box>
      </Modal>
    </>
  );
}
