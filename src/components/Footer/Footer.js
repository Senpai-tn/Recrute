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
      }}
    >
      <div className="container">
        <div className="footer-widgets-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="widget clearfix">
                <div className="row col-mb-30">
                  <div className="col-lg-3 col-6 widget_links">
                    <ul>
                      <li>
                        <a href="google.com">Home</a>
                      </li>
                      <li>
                        <a href="google.com">About</a>
                      </li>
                      <li>
                        <a href="google.com">FAQs</a>
                      </li>
                      <li>
                        <a href="google.com">Support</a>
                      </li>
                      <li>
                        <a href="google.com">Contact</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-6 widget_links">
                    <ul>
                      <li>
                        <a href="google.com">Shop</a>
                      </li>
                      <li>
                        <a href="google.com">Portfolio</a>
                      </li>
                      <li>
                        <a href="google.com">Blog</a>
                      </li>
                      <li>
                        <a href="google.com">Events</a>
                      </li>
                      <li>
                        <a href="google.com">Forums</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-6 widget_links">
                    <ul>
                      <li>
                        <a href="google.com">Corporate</a>
                      </li>
                      <li>
                        <a href="google.com">Agency</a>
                      </li>
                      <li>
                        <a href="google.com">eCommerce</a>
                      </li>
                      <li>
                        <a href="google.com">Personal</a>
                      </li>
                      <li>
                        <a href="google.com">One Page</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-6 widget_links">
                    <ul>
                      <li>
                        <a href="google.com">Corporate</a>
                      </li>
                      <li>
                        <a href="google.com">Agency</a>
                      </li>
                      <li>
                        <a href="google.com">eCommerce</a>
                      </li>
                      <li>
                        <a href="google.com">Personal</a>
                      </li>
                      <li>
                        <a href="google.com">One Page</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mt-5 mt-lg-0 text-center text-lg-end">
              <div className="widget clearfix">
                <div className="row">
                  <div className="col-12 mb-3">
                    <small>Call Us:</small>
                    <h4 className="h4">+216 00 00 00 00</h4>
                  </div>
                  <div className="col-12 d-flex justify-content-center justify-content-lg-end">
                    <a
                      href="google.com"
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
                    <a
                      href="google.com"
                      className="social-icon si-small si-light si-paypal"
                    >
                      <i className="icon-paypal"></i>
                      <i className="icon-paypal"></i>
                    </a>
                    <a
                      href="google.com"
                      className="social-icon si-small si-light si-flattr"
                    >
                      <i className="icon-flattr"></i>
                      <i className="icon-flattr"></i>
                    </a>
                  </div>
                  <div className="col-12 mt-5 text-white-50 text-smaller">
                    All Rights Reserved <br />
                    &copy; 2020
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
