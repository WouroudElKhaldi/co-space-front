"use client";

import styles from "./table.module.css";
import { useState, useEffect, useContext } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";

const Table = ({
  data,
  isEdit,
  ForWhat,
  handleEditOpen,
  setSelectedRowData,
  handleOpenDelete,
}) => {
  const { user } = useContext(AuthContext);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(false);
  const buton = isEdit === true ? true : false;

  const handleEdit = (e, row) => {
    e.preventDefault();
    handleEditOpen(row);
    setSelectedRowData(row);
  };

  const handleDelete = (e, row) => {
    e.preventDefault();
    handleOpenDelete(row);
    setSelectedRowData(row);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateObj = new Date(date);
    const localDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    ); // Adjust for timezone offset
    return localDate.toLocaleDateString("en-GB", options);
  };

  let visibleFields = [""];
  useEffect(() => {
    try {
      if (ForWhat === "spaces") {
        visibleFields = ["name", "address", "description", "status"];
      } else if (ForWhat === "users") {
        visibleFields = [
          "fullName",
          "role",
          "email",
          "phoneNumber",
          "verificationCode",
          "deleteCode",
          "status",
          "image",
        ];
      } else if (ForWhat === "amenities") {
        visibleFields = ["name", "category", "image"];
      } else if (ForWhat === "event") {
        visibleFields = [
          "title",
          "spaceName",
          "startDate",
          "endDate",
          "description",
        ];
      } else if (ForWhat === "cities") {
        visibleFields = ["city"];
      } else if (ForWhat === "rating") {
        visibleFields = ["userName", "spaceName", "rate", "message"];
      } else if (ForWhat === "rules") {
        visibleFields = ["spaceName", "name", "image"];
      } else {
        visibleFields = Object.keys(data[0]);
      }

      const updatedColumns = visibleFields.map((field) => ({
        field,
        headerName: field,
        flex: 1,
        renderCell: (params) => {
          if (
            ForWhat === "amenities" &&
            field === "image" &&
            params.row.image
          ) {
            return (
              <div className={styles.image}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${
                    params.row.image ? params.row.image : ""
                  }`}
                  alt="Icon"
                  style={{ width: "80", height: "50px" }}
                  width={80}
                  height={60}
                />
              </div>
            );
          }
          if (field === "image" && params.row.image) {
            return (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${
                  params.row.image ? params.row.image : ""
                }`}
                alt="Icon"
                style={{ width: "100", height: "80px" }}
                width={100}
                height={80}
              />
            );
          }
          if (field === "image" && !params.row.image) {
            return (
              <div className={styles.avatar}>
                <Avatar alt={params.row.fullName} />
              </div>
            );
          }
          if (field === "email" && params.row.email) {
            return <p className={styles.email}>{params.row.email}</p>;
          }
          if (field === "description" && params.row.description) {
            return <p className={styles.email}>{params.row.description}</p>;
          }
          if (field === "spaceId" && params.row.spaceId) {
            return <p className={styles.email}>{params.row.spaceId.name}</p>;
          }
          if (field === "startDate" && params.row.startDate) {
            return <div>{formatDate(params.row.startDate)}</div>;
          }
          if (field === "endDate" && params.row.endDate) {
            return <div>{formatDate(params.row.endDate)}</div>;
          }
          return params.value;
        },
      }));

      if (buton === true) {
        if (ForWhat === "rating" && user && user.role === "Manager") {
          updatedColumns.push({
            field: "delete",
            headerName: "Delete",
            renderCell: (params) => (
              <div className={styles.icon}>
                <IconButton onClick={(e) => handleDelete(e, params.row)}>
                  <DeleteIcon
                    sx={{
                      ":hover": {
                        color: "red !important",
                      },
                    }}
                  />
                </IconButton>
              </div>
            ),
          });
        } else {
          updatedColumns.push({
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
              <Grid
                container
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "5rem",
                }}
              >
                <IconButton onClick={(e) => handleEdit(e, params.row)}>
                  <EditIcon
                    sx={{
                      ":hover": {
                        color: "red !important",
                      },
                    }}
                  />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(e, params.row)}>
                  <DeleteIcon
                    sx={{
                      ":hover": {
                        color: "red !important",
                      },
                    }}
                  />
                </IconButton>
              </Grid>
            ),
          });
        }
      }

      setColumns(updatedColumns);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [ForWhat, buton, data]);

  return (
    <>
      <Box
        sx={{
          height: 818,
          mt: "2rem",
          mb: "2rem",
        }}
      >
        <DataGrid
          className={styles.scroll}
          showCellVerticalBorder
          showColumnVerticalBorder
          isCellEditable={(GridCellParams) => false}
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            width: "100%",
            transition: "all 0.05s ease",
            p: "1rem",
            rowGap: "1rem",
            borderRadius: "20px",
            "& .MuiToolbar-root , .MuiInputBase-input , .MuiDataGrid-columnHeaderTitleContainer , .MuiDataGrid-cell":
              {
                color: "black",
              },
            "& .MuiButtonBase-root ": {
              color: "#4d6188",
            },
            ".MuiSvgIcon-root ": {
              color: "#8b0000",
            },
            "& .MuiDataGrid-root , .MuiDataGrid-colCell, .MuiDataGrid-root , .MuiDataGrid-cell":
              {
                maxHeight: "100px !important",
              },
            ".MuiDataGrid-cell": {
              paddingLeft: "0.5rem",
            },
            ".MuiDataGrid-toolbarContainer": {
              fontWeight: "700",
              borderRadius: "15px",
              bgcolor: "#ededf5",
              p: "0 1rem",
            },
            ".MuiDataGrid-main , .MuiDataGrid-footerContainer": {
              bgcolor: "#ededf5",
              borderRadius: "15px",
            },
            "& .MuiDataGrid-root > *": {
              height: "100%",
            },
            "& .MuiInputBase-root , & .MuiInputBase-input": {
              color: "#000",
            },
            "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
              borderBottomColor: "#4d6188",
            },
            " & .Mui-selected ": {
              bgcolor: "#4d6188 !important",
            },
            "& .MuiDataGrid-row": {
              height: "90px !important",
              maxHeight: "90px !important",
            },
            "& .Mui-hovered": {
              bgcolor: " #4d61886e !important",
            },
            "& .Mui-selected": {
              bgcolor: "#4d61886e !important",
            },
            "& .MuiDataGrid-columnHeaders , & .MuiDataGrid-toolbarContainer , & .MuiDataGrid-footerContainer":
              {
                height: "100px !important",
                maxHeight: "100px !important",
                fontSize: "1.2rem",
                mb: "1rem",
              },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              color: "#4d6188 !important",
              padding: "0 1rem",
            },
            " .MuiDataGrid-columnHeader--sortable": {
              width: "12rem !important",
              maxWidth: "12rem !important",
              minWidth: "6px !important",
              maxHeight: "90px !important",
            },
            ".MuiDataGrid-cell": {
              width: "12rem",
              maxWidth: "12rem !important",
              minWidth: "6px !important",
              maxHeight: "90px !important",
              height: "90px",
              padding: "0 1.2rem",
              overflow: "hidden",
            },
            "& .MuiSelect-select , & .MuiTablePagination-select , & .MuiSelect-standard MuiInputBase-input css-194a1fa-MuiSelect-select-MuiInputBase-input":
              {
                color: "#4d6188 !important",
              },
            ".MuiDataGrid-cell--withRenderer .MuiDataGrid-cell ": {
              minWidth: "6rem",
              width: "6rem",
            },
            "& .MuiDataGrid-scrollbar": {
              // Style the scrollbar track
              width: "8px",
              bgcolor: "black",
            },
            "& .MuiDataGrid-scrollbarThumb": {
              // Style the scrollbar thumb
              backgroundColor: "#ccc",
              borderRadius: "4px",
            },
          }}
        />
      </Box>
    </>
  );
};

export default Table;
