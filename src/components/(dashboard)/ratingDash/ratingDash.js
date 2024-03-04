"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import { useContext, useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import styles from "../spacesDash/spaceDash.module.css";
import useAlertStore from "@/zustand/alertStore";
import { AuthContext } from "@/context/authContext";
import RatingModal from "../ratingModal/ratingModal";
import DeleteRatingModal from "../ratingModal/DeleteRatingModal";
import { getAllRatings, getRatingsByManagerId } from "@/fetchData/rating";
import useRatingStore from "@/zustand/ratingStore";

const RatingDash = () => {
  const { ratingData, setRatingData } = useRatingStore();
  const { user } = useContext(AuthContext);
  const { alertData } = useAlertStore();
  const [openNote, setOpenNote] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchAllRatings = async () => {
      const response = await getAllRatings();
      setRatingData(response.data);
    };

    const getRatingsByManagerId = async () => {
      const response = await getAllRatings();
      setRatingData(response.data);
    };

    if (user && user.role === "Admin") {
      fetchAllRatings();
    } else if (user && user.role === "Manager") {
      getRatingsByManagerId();
    }
  }, [success, setRatingData, user]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Ratings</h1>
      </div>
      <Table
        data={ratingData && ratingData}
        ForWhat={"rating"}
        isEdit={true}
        handleOpenDelete={() => setOpenDelete(true)}
        handleEditOpen={() => setOpenEdit(true)}
        setSelectedRowData={setSelectedRowData}
      />
      <DoneModal
        type={alertData.type}
        message={alertData.message}
        open={openNote}
        handleClose={() => setOpenNote(false)}
      />
      <RatingModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData && selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteRatingModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData && selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default RatingDash;
