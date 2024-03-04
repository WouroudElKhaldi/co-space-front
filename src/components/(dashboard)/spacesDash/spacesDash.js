"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import useSpaceStore from "@/zustand/spaceStore";
import { useContext, useEffect, useState } from "react";
import { getAllSpaces, getSpacesByUser } from "@/fetchData/spaces";
import DoneModal from "../../doneModal/doneModal";
import DeleteSpaceModal from "../spaceModal/DeleteSpaceModal";
import styles from "./spaceDash.module.css";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

const SpacesDash = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { spacesData, setSpacesData } = useSpaceStore();
  const [openNote, setOpenNote] = useState({
    open: false,
    status: "",
    message: "",
  });
  const [selectedRowData, setSelectedRowData] = useState({});
  const [succesDelete, setSuccesDelete] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseNote = () => {
    setOpenNote({
      open: false,
      status: "",
      message: "",
    });
  };

  const handleOpenNote = ({ status, message }) => {
    setOpenNote({
      open: true,
      status: status,
      message: message,
    });
  };

  useEffect(() => {
    if (user && user.role === "Admin") {
      const fetchSpaces = async () => {
        const res = await getAllSpaces();
        setSpacesData(res.data);
      };
      fetchSpaces();
    } else if (user && user.role === "Manager") {
      const fetchSpacesByUser = async () => {
        const res = await getSpacesByUser({ userId: user._id });
      };

      fetchSpacesByUser();
    }
  }, [succesDelete, setSpacesData, user]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Spaces</h1>
        <button
          className={styles.button}
          onClick={() => router.push("/dashboard/add-space")}
        >
          Add Space
        </button>
      </div>
      <Table
        data={spacesData && spacesData}
        ForWhat={"spaces"}
        isEdit={true}
        handleOpenDelete={() => setOpenDelete(true)}
        setSelectedRowData={setSelectedRowData}
      />
      <DoneModal
        type={openNote.status}
        message={openNote.message}
        open={openNote.open}
        handleClose={handleCloseNote}
      />
      <DeleteSpaceModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccesDelete}
      />
    </Box>
  );
};

export default SpacesDash;
