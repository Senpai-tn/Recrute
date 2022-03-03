import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListOffers from "../Offers/ListOffers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
function Home() {
  const dispatch = useDispatch();
  var user = useSelector((state) => state.user);

  const Change = () => {
    dispatch({
      type: "auth",
      user: {},
    });
    window.location.assign("/");
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ flex: 1, minHeight: "100vh" }}>
      Home {user.login}
      <button
        onClick={() => {
          Change();
        }}
        style={{ color: "red", border: 0, right: 0, position: "absolute" }}
      >
        Logout
        <FontAwesomeIcon icon={faLongArrowAltRight} color="red" />
      </button>
      <ListOffers />
    </div>
  );
}

export default Home;
