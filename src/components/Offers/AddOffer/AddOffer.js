import { Autocomplete, Checkbox, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

function AddOffer() {
  var user = useSelector((state) => state.user);
  var dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [min, setMin] = useState(0);
  const [type, setType] = useState("");
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const addOfferAction = (event) => {
    event.preventDefault();
    var state;
    if (checked) {
      state = "DRAFT";
    } else {
      state = "SENT";
    }

    if (type != null)
      axios
        .post("http://127.0.0.1:5000/offers", {
          user: user,
          offer: {
            title: title,
            type: type,
            min: min,
            state: state,
            RH: user._id,
          },
        })
        .then((res) => {
          if (res.data.errors != null) {
            alert("error " + res.data.message);
          } else {
            console.log(res);
            dispatch({ type: "addOffer", user: res.data });
            window.location.assign("/HR");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <form onSubmit={addOfferAction}>
        <Stack
          sx={{
            height: "500px",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            required
            fullWidth
            label="Title of offer"
            type={"text"}
            value={title}
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
            onChange={(event, v) => {
              setType(v);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Type of offer" />
            )}
          />
          <TextField
            required
            fullWidth
            label="Minimum result"
            type={"number"}
            value={min}
            onChange={(e) => {
              setMin(e.target.value);
            }}
          />
          <div>
            <label htmlFor="state">Draft ?</label>
            <Checkbox
              id="state"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <input
            type={"submit"}
            className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
            id="login-form-submit"
            name="login-form-submit"
            value="Add"
            style={{ width: 150 }}
          />
        </Stack>
      </form>
    </div>
  );
}

export default AddOffer;
