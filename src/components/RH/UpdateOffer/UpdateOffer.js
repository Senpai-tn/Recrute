import {
  Autocomplete,
  Box,
  Checkbox,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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
const UpdateOffer = ({ isOpen, handleClose }) => {
  var offer = useSelector((state) => state.offer);
  const [title, setTitle] = useState(offer.title);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
          <TextField
            required
            type={"text"}
            value={offer.title}
            placeholder="Title of offer"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            autoComplete
            includeInputInList
            options={["C++", "HTML", "JAVA", "JS", "PYTHON", "REACT JS"]}
            sx={{ width: 300 }}
            value={offer.type}
            renderInput={(params) => (
              <TextField {...params} label="Type of offer" />
            )}
          />

          <Checkbox
            checked={offer.state == "DRAFT"}
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
