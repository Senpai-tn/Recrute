import { faHeart, faL, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Spinner from "../../images/spinner.gif";
import Modal from "react-modal/lib/components/Modal";
function OfferInfo() {
  const [offer, setOffer] = useState({});
  const [test, setTest] = useState(false);
  var user = useSelector((state) => state.user);
  var dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || "";
  var isLoading = useSelector((state) => state.isLoading);

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

  const check = (offer) => {
    offer.candidates.map((c) => {
      if (c.user._id == user._id) {
        setTest(true);
      }
    });
  };

  const getOffer = (check) => {
    dispatch({ type: "loading", isLoading: true });
    axios
      .get("http://127.0.0.1:5000/offers/get/" + id)
      .then((res) => {
        dispatch({ type: "loading", isLoading: false });
        setOffer(res.data);
        check(res.data);
      })
      .finally(() => {})
      .catch((error) => {
        dispatch({ type: "loading", isLoading: false });
      });
  };

  useEffect(() => {
    getOffer(check);

    return () => {};
  }, []);

  if (id == undefined) {
    return <div></div>;
  }

  return (
    <div>
      <Modal isOpen={isLoading} className="Modal" overlayClassName="Overlay">
        <img alt="spinner" src={Spinner} />
      </Modal>
      <h2>OfferInfo {offer._id}</h2>
      <img
        src={"../../images/" + offer.type + ".png"}
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
        {offer.candidates != null ? (
          <>
            {offer.candidates.length} <FontAwesomeIcon icon={faUsers} />
          </>
        ) : null}
      </p>
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
        {!test ? (
          <Link to={"/quiz"} state={{ offer: offer }}>
            Apply
          </Link>
        ) : null}
      </p>
      <Footer />
    </div>
  );
}

export default OfferInfo;
