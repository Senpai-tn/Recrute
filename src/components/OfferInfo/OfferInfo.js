import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

function OfferInfo() {
  const [offer, setOffer] = useState({});
  var user = useSelector((state) => state.user);
  var dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || "";

  const checkOffer = (user, offer) => {
    var result;
    user.likes.map((u) => {
      if (u._id == offer._id) {
        result = true;
      }
    });
    return result == true;
  };

  const like = () => {
    if (checkOffer(user, offer)) {
      var filtered = user.likes.filter((value, index, arr) => {
        return value._id != offer._id;
      });
      user.likes = filtered;
    } else {
      user.likes = [...user.likes, offer];
    }
    dispatch({ type: "like", user: user });
    window.location.reload();
  };

  useEffect(() => {
    console.log(id);
    axios
      .get("http://127.0.0.1:5000/offers/get/" + id)
      .then((res) => {
        console.log(res.data);
        setOffer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {};
  }, []);
  if (id == undefined) {
    return <div></div>;
  }
  return (
    <div>
      <h2>OfferInfo {offer.title}</h2>
      <img
        src="https://www.softfluent.fr/wp-content/uploads/2019/10/css-3.png"
        alt={"offer " + offer.title}
        style={{ height: "30vh", width: "auto" }}
      />
      <span>
        {new Date(offer.createdAt).getUTCDate() +
          "/" +
          (new Date(offer.createdAt).getMonth() + 1) +
          "/" +
          new Date(offer.createdAt).getFullYear()}
      </span>
      <p>
        <button
          onClick={() => {
            like();
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: checkOffer(user, offer) ? "red" : "yellow" }}
          />
        </button>
      </p>
      <p>
        <Link to={"/quiz"} state={{ offer: offer }}>
          Apply
        </Link>
      </p>
      <Footer />
    </div>
  );
}

export default OfferInfo;
