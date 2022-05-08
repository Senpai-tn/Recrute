import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateOffer from "../UpdateOffer/UpdateOffer";
import { withStyles } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
  },
})(DataGrid);

function Dashboard() {
  const state = useSelector((state) => state);
  const [isOpen, setisOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [Rows, setRows] = useState([]);
  const [FilteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Delete = (idOffer) => {
    dispatch({ type: "loading", isLoading: true });
    setIsSubmit(true);
    axios
      .delete("http://127.0.0.1:5000/rh", {
        data: { idOffer: idOffer, idUser: state.user._id },
      })
      .then((res) => {
        if (res.data.errors != null) {
          alert(res.data.errors.state.message);
        } else {
          setTimeout(() => {
            dispatch({ type: "setUser", user: res.data });
            dispatch({ type: "loading", isLoading: false });
            setIsSubmit(false);
          }, 500);
        }
      });
  };

  const handleClose = () => {
    setisOpen(false);
  };
  const width = 180;
  const columns = [
    { field: "title", headerName: "Title", width: width },
    {
      field: "type",
      headerName: "Type",
      width: width - 20,
    },
    {
      field: "state",
      headerName: "State",
      width: width - 50,
    },
    {
      field: "nbCandidates",
      headerName: "Number of Candidates",
      width: width,
      renderCell: (params) => {
        return (
          <>
            {params.row.nbCandidates}
            <Link to={"/getCandidates"} state={{ id: params.row.id }}>
              <small>(view)</small>
            </Link>
          </>
        );
      },
    },
    {
      field: "nbSucceful",
      headerName: "Number of Succeful",
      width: width,

      renderCell: (params) => {
        return (
          <>
            {params.row.nbSucceful}
            <Link to={"/getCandidates"} state={{ id: params.row.id }}>
              <small>(view)</small>
            </Link>
          </>
        );
      },
    },

    {
      field: "deletedAt",
      headerName: "Deleted At",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: width,

      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    {
      field: "action",
      width: width + 30,
      renderCell: (params) => {
        return params.row.deletedAt == null ? (
          <div
            style={{
              width: 350,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{ marginX: "5px" }}
              color="warning"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                setisOpen(true);
                dispatch({
                  type: "OfferToUpdate",
                  offer: state.offers.find((offer) => {
                    return offer._id === params.row.id;
                  }),
                });
              }}
            >
              Update
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                Delete(params.row.id);
              }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div
            className="ADMIN"
            style={{
              width: 350,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            Deleted
          </div>
        );
      },
    },
  ];

  const handleSearch = (searchInput) => {
    setSearch(searchInput);
    if (searchInput) {
      console.log("search");
      setFilteredRows(
        state.offers.filter((offer) => {
          return offer.title.includes(searchInput);
        }),
      );
    } else {
      setFilteredRows(state.offers);
    }
  };

  useEffect(() => {
    if (!isSubmit) {
      axios.get("http://localhost:5000/rh/" + state.user._id).then((res) => {
        dispatch({ type: "setUser", user: res.data.rh });
        dispatch({ type: "GetAllOffers", offers: res.data.offers });
      });
    }
  }, [isSubmit]);

  const dateFormat = (date) => {
    if (date == null) return;
    return (
      new Date(date).getFullYear() +
      "/" +
      (new Date(date).getMonth() + 1) +
      "/" +
      new Date(date).getDate() +
      "   " +
      new Date(date).getHours() +
      ":" +
      new Date(date).getMinutes() +
      ":" +
      new Date(date).getSeconds()
    );
  };
  useEffect(() => {
    setFilteredRows(state.offers);
  }, [state.offers]);

  useEffect(() => {
    var tempRows = [];
    FilteredRows.map((item) => {
      tempRows.push({
        id: item._id + "",
        title: item.title,
        type: item.type,
        state: item.state,
        nbCandidates: item.candidates.length,
        nbSucceful: item.candidates.filter((obj) => obj.exam.result >= item.min)
          .length,
        deletedAt: dateFormat(item.deletedAt),
      });
    });
    setRows(tempRows);
  }, [FilteredRows]);

  return (
    <div>
      {isOpen && (
        <UpdateOffer
          isOpen={isOpen}
          handleClose={handleClose}
          setIsSubmit={setIsSubmit}
        />
      )}
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          padding: "30px 100px",
        }}
      >
        <Button
          onClick={() => {
            window.location.assign("/addoffer");
          }}
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          Add offer
        </Button>

        <TextField
          variant="outlined"
          label="Search"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>

      {FilteredRows.length > 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            height: Rows.length * 50 + 120,
            maxHeight: 375,
            padding: "0 100px",
          }}
        >
          <StyledDataGrid
            rowHeight={50}
            rows={Rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            hideFooterSelectedRowCount
          />
        </div>
      ) : (
        <Alert
          severity="error"
          variant="outlined"
          sx={{
            marginY: "150px",
            justifyContent: "center",
            width: "500px",
            marginX: "50%",
            transform: "translate(-50%,0)",
            fontSize: "18px",
            fontWeight: "bolder",
          }}
        >
          No offers found
        </Alert>
      )}
    </div>
  );
}

export { Dashboard };
