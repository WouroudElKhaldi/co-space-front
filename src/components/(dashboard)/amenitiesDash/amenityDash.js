"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import useAmenityStore from "@/zustand/amenitiesStore";
import { useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import styles from "../spacesDash/spaceDash.module.css";
import useAlertStore from "@/zustand/alertStore";
import AmenityModal from "../amenityModal/amenityModal";
import DeleteAmenityModal from "../amenityModal/deleteAmenity";
import { getAmenities } from "@/fetchData/amenities";

const AmenityDash = () => {
  const { amenitiesData, setAmenitiesData } = useAmenityStore();
  const { alertData } = useAlertStore();
  const [openNote, setOpenNote] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await getAmenities();
      setAmenitiesData(response);
    };

    fetchAmenities();
  }, [success, setAmenitiesData]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Amenities</h1>
        <button
          className={`${styles.button} ${styles.amenity}`}
          onClick={() => setOpenAdd(true)}
        >
          Add Amenity
        </button>
      </div>
      <Table
        data={amenitiesData && amenitiesData}
        ForWhat={"amenities"}
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
      <AmenityModal
        type="add"
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <AmenityModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData && selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteAmenityModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData && selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default AmenityDash;
