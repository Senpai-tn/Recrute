import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user.offers.map((o) => {
        return (
          <div style={{ display: "block" }}>
            <div style={{ display: "inline" }}>{o.title}</div>

            <FontAwesomeIcon
              icon={faPencil}
              color="orange"
              fontSize={35}
              style={{ marginLeft: 20 }}
              onClick={() => {
                alert("dfdf" + o._id);
              }}
            />
            <FontAwesomeIcon
              icon={faTimes}
              color="red"
              fontSize={35}
              style={{ marginLeft: 20 }}
              onClick={() => {
                alert("dfdf" + o._id);
              }}
            />
          </div>
        );
      })}
    </>
  );
}

export { Dashboard };
