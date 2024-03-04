"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import { useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import styles from "../spacesDash/spaceDash.module.css";
import useAlertStore from "@/zustand/alertStore";
import useCityStore from "@/zustand/cityStore";
import CityModal from "../cityModal/cityModal";
import DeleteCityModal from "../cityModal/deleteCityModal";
import { getAllCities } from "@/fetchData/city";

const CityDash = () => {
  const { cityData, setCityData } = useCityStore();
  const { alertData } = useAlertStore();
  const [openNote, setOpenNote] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getAllCities();
      setCityData(response.data);
    };

    fetchCities();
  }, [success, setCityData]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Cities</h1>
        <button
          className={`${styles.button} ${styles.amenity}`}
          onClick={() => setOpenAdd(true)}
        >
          Add City
        </button>
      </div>
      <Table
        data={cityData && cityData}
        ForWhat={"cities"}
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
      <CityModal
        type="add"
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <CityModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData && selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteCityModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData && selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default CityDash;
