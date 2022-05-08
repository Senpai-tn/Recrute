import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Footer() {
  return (
    <div
      id="footer"
      className="dark"
      style={{
        backgroundColor: "#101010",
        width: "100px",
        position: "fixed",
        bottom: 15,
        right: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        //paddingX: "20px",
      }}
    >
      <a
        href="https://www.facebook.com"
        className="social-icon si-small si-light si-facebook"
      >
        <i className="icon-facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </i>
        <i className="icon-facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </i>
      </a>
      <a
        href="https://www.instagram.com"
        className="social-icon si-small si-colored si-google"
      >
        <i className="icon-instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </i>
        <i className="icon-instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </i>
      </a>
    </div>
  );
}

export default Footer;
