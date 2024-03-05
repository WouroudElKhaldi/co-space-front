"use client";
import styles from "./allRatings.module.css";
import { motion } from "framer-motion";
import { Avatar, IconButton, Modal, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export function AllRatingsModal({ openRatings, handleClose, ratings }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateObj = new Date(date);
    const localDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    ); // Adjust for timezone offset
    return localDate.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <Modal
        open={openRatings}
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
            <div className={styles.title}>
              <p>Space Ratings</p>
              <IconButton
                onClick={() => handleClose()}
                className={styles.close}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <ul className={styles.comments_Holder}>
              {ratings &&
                ratings.map((rating, index) => {
                  return (
                    <li key={index} className={styles.rating_Li}>
                      <div className={styles.Rate_titleHolder}>
                        <div className={styles.rating_Title}>
                          <Avatar
                            src={rating.userId.image}
                            alt={rating.userId.fullName}
                            className={styles.rating_Image}
                          />
                          <p className={styles.rating_Name}>
                            {rating.userId.fullName}
                          </p>
                        </div>

                        <p className={styles.rating_Date}>
                          {formatDate(rating.createdAt)}
                          {}
                        </p>
                      </div>
                      <div className={styles.Rate_titleHolder}>
                        <p className={styles.rating_Message}>
                          {rating.message}
                        </p>
                        <p className={styles.rating_Star}>
                          {rating.rate}
                          <Rating
                            value={rating.rate}
                            readOnly
                            precision={0.25}
                          />
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </motion.Box>
      </Modal>
    </>
  );
}
