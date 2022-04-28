import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import UpdateOffer from "../UpdateOffer/UpdateOffer";
function Dashboard() {
  const user = useSelector((state) => state.user);
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();
  const Delete = (idOffer) => {
    axios
      .delete("http://127.0.0.1:5000/rh", {
        data: { idOffer: idOffer, idUser: user._id },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "setUser", user: res.data });
      });
  };

  const handleClose = () => {
    setisOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div>
      {isOpen && <UpdateOffer isOpen={isOpen} handleClose={handleClose} />}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
      </div>

      {user.offers.map((o) => {
        return o.deletedAt == null ? (
          <div style={{ display: "block" }}>
            <div style={{ display: "inline" }}>{o.title}</div>

            <FontAwesomeIcon
              icon={faPencil}
              color="orange"
              fontSize={35}
              style={{ marginLeft: 20 }}
              onClick={() => {
                setisOpen(true);
                dispatch({ type: "OfferToUpdate", offer: o });
              }}
            />
            <FontAwesomeIcon
              icon={faTimes}
              color="red"
              fontSize={35}
              style={{ marginLeft: 20 }}
              onClick={() => {
                Delete(o._id);
              }}
            />
          </div>
        ) : null;
      })}
    </div>
  );
}

export { Dashboard };
