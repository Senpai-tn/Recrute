import { Button, Divider, Modal, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../images/spinner.gif";

const CheckOffer = () => {
  const params = useParams();
  var isLoading = useSelector((state) => state.isLoading);
  const [offer, setOffer] = useState({});
  var dispatch = useDispatch();
  const getOffer = (check) => {
    dispatch({ type: "loading", isLoading: true });
    axios
      .get("http://127.0.0.1:5000/offers/get/" + params.id)
      .then((res) => {
        dispatch({ type: "loading", isLoading: false });
        setOffer(res.data);
      })
      .finally(() => {})
      .catch((error) => {
        dispatch({ type: "loading", isLoading: false });
      });
  };

  const AnswerOfferAction = (state) => {
    axios
      .put("http://localhost:5000/admin/checkoffer", {
        id: params.id,
        state: state,
      })
      .then((res) => {
        if (res.data.errors != null) {
          console.log("error");
        } else {
          window.location.assign("http://localhost:3000/admin");
        }
      });
  };

  useEffect(() => {
    getOffer();
  }, []);

  return (
    <div>
      <Modal isOpen={isLoading} className="Modal" overlayClassName="Overlay">
        <img alt="spinner" src={Spinner} />
      </Modal>

      <Stack
        sx={{
          width: window.innerWidth * 0.3,
          //height: "130px",
          marginX: "50%",
          transform: "translate(-50%,0)",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        CheckOffer {offer.title}
        <img
          src={"../../../images/" + offer.type + ".png"}
          alt={"offer " + offer.title}
          style={{ height: "30vh", width: "auto" }}
        />
        <Divider>Actions</Divider>
        <Button
          onClick={() => {
            AnswerOfferAction("ACCEPTED");
          }}
          sx={{ marginY: "20px" }}
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutlineIcon />}
        >
          Accept
        </Button>
        <Button
          onClick={() => {
            AnswerOfferAction("REFUSED");
          }}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Refuse
        </Button>
      </Stack>
    </div>
  );
};

export default CheckOffer;
