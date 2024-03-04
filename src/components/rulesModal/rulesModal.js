"use client";
import styles from "./rulesModal.module.css";
import { motion } from "framer-motion";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
export function RulesModal({ openRules, handleClose, rules }) {
  return (
    <>
      <Modal
        open={openRules}
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
              <p>Space Rules</p>
              <IconButton
                onClick={() => handleClose()}
                className={styles.close}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <ul className={styles.rule_Holder}>
              {rules.map((rule, index) => {
                return (
                  <li key={index} className={styles.rule_Li}>
                    <Image
                      className={styles.rule_Image}
                      width={200}
                      height={200}
                      alt={rule.name}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${rule.image}`}
                    />
                    <p className={styles.rule_Name}>{rule.name}</p>
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
