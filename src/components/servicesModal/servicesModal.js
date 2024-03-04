"use client";
import styles from "./servicesModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
export function ServicesModal({ openServices, handleClose, services }) {
  return (
    <>
      <Modal
        open={openServices}
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
              <p>Space Services</p>
              <IconButton
                onClick={() => handleClose()}
                className={styles.close}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <ul className={styles.service_Ul}>
              {services.map((service, index) => {
                return (
                  <li key={index} className={styles.service_Li}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}/images/${service.image}`}
                      className={styles.service_Image}
                      width={100}
                      height={100}
                      alt={service.name}
                    />
                    <p className={styles.service_Name}>{service.name}</p>
                    <p className={styles.service_Description}>
                      {service.description}
                    </p>
                    <ul className={styles.service_Price}>
                      <li className={styles.service_Price_Li}>
                        Daily :
                        {service.dailyPrice
                          ? `${" " + service.dailyPrice}$`
                          : " On Contact"}
                      </li>
                      <li className={styles.service_Price_Li}>
                        Monthly :
                        {service.monthlyPrice
                          ? `${" " + service.monthlyPrice}$`
                          : " On Contact"}
                      </li>
                      <li className={styles.service_Price_Li}>
                        Annually :
                        {service.AnnuallyPrice
                          ? `${" " + service.AnnuallyPrice}$`
                          : " On Contact"}
                      </li>
                    </ul>
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
