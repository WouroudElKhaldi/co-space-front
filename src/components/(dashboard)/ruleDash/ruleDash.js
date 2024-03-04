"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import { useContext, useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import styles from "../spacesDash/spaceDash.module.css";
import { AuthContext } from "@/context/authContext";
import useAlertStore from "@/zustand/alertStore";
import RuleModal from "../ruleModal/ruleModal";
import DeleteRuleModal from "../ruleModal/deleteRuleModal";
import { getAllRules } from "@/fetchData/rule";
import useRuleStore from "@/zustand/ruleStore";

const RuleDash = () => {
  const { user } = useContext(AuthContext);
  const { ruleData, setRuleData } = useRuleStore();
  const { alertData } = useAlertStore();
  const [openNote, setOpenNote] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchRules = async () => {
      const response = await getAllRules();
      setRuleData(response.data);
    };
    fetchRules();
  }, [success, setRuleData]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Rules</h1>
        <button className={styles.button} onClick={() => setOpenAdd(true)}>
          Add Rule
        </button>
      </div>
      <Table
        data={ruleData && ruleData}
        ForWhat={"rules"}
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
      <RuleModal
        type="add"
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <RuleModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData && selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteRuleModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData && selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default RuleDash;
