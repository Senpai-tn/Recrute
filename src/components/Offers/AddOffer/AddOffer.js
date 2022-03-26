import axios from "axios";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

function AddOffer() {
  var user = useSelector((state) => state.user);
  var dispatch = useDispatch();
  const addOffer = () => {
    axios
      .post("http://localhost:5000/offers", {
        user: user,
        offer: { title: "T2", type: "T2" },
      })
      .then((res) => {
        dispatch({ type: "auth", user: res.data.user });
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {user.login}

      <input type={"text"} />

      <button
        onClick={() => {
          addOffer();
        }}
      >
        Add Offer
      </button>
    </div>
  );
}

export default AddOffer;
