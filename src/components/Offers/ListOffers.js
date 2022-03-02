import {
  faGrinHearts,
  faHeart,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./ListOffers.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ListOffers() {
  const [offers, setOffers] = useState([]);
  var user = useSelector((state) => state.user);

  const checkOffer = (user, offer) => {
    var result;
    user.likes.map((u) => {
      if (u._id === offer._id) {
        result = true;
      }
    });
    return result == true;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/offers").then((res) => {
      setOffers(res.data);
      console.log(offers);
    });
    return () => {};
  }, []);

  return (
    <div className="content">
      {offers.map((item) => {
        return (
          <Link to={"/offer"} state={{ id: item._id }}>
            <div className="item">
              <img
                className="img"
                src="https://www.softfluent.fr/wp-content/uploads/2019/10/css-3.png"
              />
              <span style={{ fontSize: 28, color: "red" }}>
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
      })}
      <Footer />
    </div>
  );
}

export default ListOffers;