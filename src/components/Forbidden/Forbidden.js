import React from "react";
import Header from "../Header/Header";

function Forbidden() {
  return (
    <div>
      <img
        src={require("../../images/403.gif")}
        style={{ height: "75%", width: "auto" }}
      />
    </div>
  );
}

export default Forbidden;
