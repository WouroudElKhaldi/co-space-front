"use client";
import styles from "./galleryModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { ImageModal } from "./imageModal";
import { useState } from "react";
export function GalleryModal({ openGallery, handleClose, images }) {
  const [openImage, setOpenImage] = useState({
    open: false,
    src: "",
  });
  return (
    <>
      <Modal
        open={openGallery}
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
          <div className={styles.container}>
            <div className={styles.title}>
              <p>Space Images</p>
              <IconButton onClick={() => handleClose()}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={styles.grid_Gallery}>
              {images.map((image, index) => (
                <div key={index} className={styles.grid_Item}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}/images/${image.image}`}
                    width={200}
                    height={200}
                    alt={`image-${index}`}
                    className={`${styles.img} ${styles[`img${index + 1}`]}`}
                    onClick={() =>
                      setOpenImage({
                        open: true,
                        src: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/images/${image.image}`,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.Box>
      </Modal>
      <ImageModal
        openImage={openImage.open}
        handleClose={() => setOpenImage({ open: false, src: "" })}
        image={openImage.src}
      />
    </>
  );
}
