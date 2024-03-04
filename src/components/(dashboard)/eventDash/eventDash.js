"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import { useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import styles from "../spacesDash/spaceDash.module.css";
import useAlertStore from "@/zustand/alertStore";
import { getAllEvents } from "@/fetchData/event";
import useEventStore from "@/zustand/eventsStore";
import EventModal from "../eventModal/eventModal";
import DeleteEventModal from "../eventModal/deleteEventModal";

const EventDash = () => {
  const { eventsData, setEventsData } = useEventStore();
  const { alertData } = useAlertStore();
  const [openNote, setOpenNote] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents();
      setEventsData(response.data);
    };

    fetchEvents();
  }, [success, setEventsData]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Events</h1>
        <button className={styles.button} onClick={() => setOpenAdd(true)}>
          Add Event
        </button>
      </div>
      <Table
        data={eventsData && eventsData}
        ForWhat={"event"}
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
      <EventModal
        type="add"
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <EventModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData && selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteEventModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData && selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default EventDash;
