import {
  Autocomplete,
  Box,
  Checkbox,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "5px solid grey",
  boxShadow: 24,
  p: 4,
};
const UpdateOffer = ({ isOpen, handleClose, setIsSubmit }) => {
  var offer = useSelector((state) => state.offer);
  var user = useSelector((state) => state.user);
  const [title, setTitle] = useState(offer.title);
  const [type, setType] = useState(offer.type);
  const [isDraft, setIsDraft] = useState(offer.state === "DRAFT");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    dispatch({ type: "loading", isLoading: true });
    axios
      .put("http://localhost:5000/offers", {
        id: offer._id,
        state: offer.state === "DRAFT" && isDraft ? "DRAFT" : "SENT",
        title: title,
        type: type,
      })
      .then((res) => {
        dispatch({ type: "OfferToUpdate", offer: res.data.offer });
        dispatch({
          type: "setUser",
          user: res.data.rh,
        });

        handleClose();
        dispatch({ type: "loading", isLoading: false });
        setIsSubmit(false);
      });
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            type={"text"}
            value={title}
            placeholder="Title of offer"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            autoComplete
            includeInputInList
            options={["C++", "HTML", "JAVA", "JS", "PYTHON", "REACT JS"]}
            sx={{ width: 300 }}
            value={type}
            onChange={(event, newValue) => {
              setType(newValue);
            }}
            renderInput={(params) => (
              <TextField required {...params} label="Type of offer" />
            )}
          />

          <Checkbox
            disabled={offer.state != "DRAFT"}
            defaultValue={offer.state == "DRAFT"}
            checked={isDraft}
            onChange={() => {
              setIsDraft(!isDraft);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <input
            type={"submit"}
            className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
            id="login-form-submit"
            name="login-form-submit"
            value="Add"
            style={{ width: 150 }}
          />
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateOffer;
