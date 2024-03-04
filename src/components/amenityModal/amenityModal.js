"use client";
import styles from "./amenityModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
export function AmenityModal({ openAmenities, handleClose, amenities }) {
  return (
    <>
      <Modal
        open={openAmenities}
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
          <div className={styles.holder}>
            <IconButton onClick={() => handleClose()} className={styles.close}>
              <CloseIcon />
            </IconButton>
            <p className={styles.title}>What this place offer:</p>
            <ul className={styles.amenity_cont}>
              {Object.entries(amenities).map(
                ([category, categoryAmenities]) => (
                  <div key={category} className={styles.categoryHolder}>
                    <p className={styles.categoryTitle}>{category}</p>
                    <ul className={styles.amenity_Holder}>
                      {categoryAmenities.map((amenity, index) => (
                        <li key={index} className={styles.amenity_Li}>
                          <Image
                            className={styles.amenity_Image}
                            width={200}
                            height={200}
                            alt={amenity.name}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${amenity.image}`}
                          />
                          <p className={styles.amenity_Name}>{amenity.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </ul>
          </div>
        </motion.Box>
      </Modal>
    </>
  );
}
