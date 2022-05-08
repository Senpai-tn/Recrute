import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./ListOffers.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Box, Stack, TextField } from "@mui/material";

function ListOffers() {
  const [offers, setOffers] = useState([]);
  var user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [tempOffers, setTempOffers] = useState([]);
  const checkOffer = (user, offer) => {
    var result;
    user.likes.map((u) => {
      if (u === offer._id) {
        result = true;
      }
    });
    return result == true;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/offers").then((res) => {
      setOffers(res.data);
      setTempOffers(res.data);
    });
    return () => {};
  }, []);

  return (
    <div className="content" style={{ overflowY: "hidden" }}>
      <TextField
        sx={{ top: "10px", marginY: "10px" }}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setTempOffers(
            offers.filter((offer) => {
              return (
                offer.title.toLowerCase().includes(e.target.value) ||
                offer.type.toLowerCase().includes(e.target.value) ||
                offer.title.toUpperCase().includes(e.target.value) ||
                offer.type.toUpperCase().includes(e.target.value)
              );
            }),
          );
        }}
      />

      <Box
        sx={{
          //position: "absolute",
          top: "150px",
          left: "0",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        {tempOffers.length > 0 ? (
          tempOffers.map((item) => {
            return (
              <Link to={"/offer"} state={{ id: item._id }}>
                <div className="item">
                  <img
                    className="img"
                    src={"../../images/" + item.type + ".png"}
                    alt={item.title}
                  />
                  <span
                    style={{
                      fontSize: 28,
                      color: "red",
                      position: "absolute",
                      bottom: 8,
                      left: "25%",
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faHeart}
                      style={{
                        color: checkOffer(user, item) ? "red" : "yellow",
                      }}
                    />
                  </span>
                  <p className="title">{item.title}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <Alert
            severity="error"
            variant="outlined"
            sx={{
              marginY: "150px",
              justifyContent: "center",
              width: "500px",
              marginX: "50%",
              transform: "translate(-50%,0)",
              fontSize: "18px",
              fontWeight: "bolder",
            }}
          >
            No offers found
          </Alert>
        )}
      </Box>
    </div>
  );
}

export default ListOffers;
