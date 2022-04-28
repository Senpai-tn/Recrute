import { Autocomplete, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

function AddOffer() {
  var user = useSelector((state) => state.user);
  var dispatch = useDispatch();
  const [title, setTitle] = useState("");
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
          offer: { title: title, type: type, state: state, RH: user },
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
    <div>
      <form onSubmit={addOfferAction}>
        <TextField
          required
          type={"text"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title of offer"
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

        <Checkbox
          checked={checked}
          onChange={handleChange}
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
    </div>
  );
}

export default AddOffer;
