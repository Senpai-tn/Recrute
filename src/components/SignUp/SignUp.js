import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import User from "../../models/User";
import { useDispatch } from "react-redux";

import Footer from "../Footer/Footer";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [login, setlogin] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { type } = location.state;

  const showPassword = () => {
    var x = document.getElementById("login-form-password");
    if (x.type === "password") {
      x.type = "text";
      document
        .getElementsByclassName("#login-form-password + button")
        .addclassName("passowd-shown");
    } else {
      x.type = "password";
      document
        .getElementsByclassName("#login-form-password + button")
        .removeclassName("passowd-shown");
    }
  };

  const RegisterAction = () => {
    var user = new User(login, firstName, lastName, password, email, type);
    axios
      .post("http://localhost:5000/register", { user })
      .then((res) => {
        console.log(res);
        dispatch({ type: "auth", user: res.data });
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section id="content">
      <div className="content-wrap py-0">
        <div className="section m-0">
          <div className="curve-bg"></div>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="cs-signin-form">
              <div className="cs-signin-form-inner">
                <div className="text-center">
                  <h3 className="h1 fw-bolder mb-3">Sign Up</h3>
                  {/* <p
                    className="text-smaller text-muted mb-4"
                    style={{ lineHeight: 1.5 }}
                  >
                    <p className="divider divider-center my-2">
                      <span>With</span>
                    </p>
                  </p> */}
                </div>
                {/* <div className="d-flex justify-content-center mb-2">
                  <a
                    href="/"
                    className="social-icon si-small si-colored si-facebook"
                    title="Facebook"
                  >
                    <i className="icon-facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </i>
                    <i className="icon-facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </i>
                  </a>
                  <a
                    href="/"
                    className="social-icon si-small si-colored si-google"
                    title="google"
                  >
                    <i className="icon-google">
                      <FontAwesomeIcon icon={faGoogle} />
                    </i>
                    <i className="icon-google">
                      <FontAwesomeIcon icon={faGoogle} />
                    </i>
                  </a>
                  <a
                    href="/"
                    className="social-icon si-small si-colored si-appstore"
                    title="apple"
                  >
                    <i className="icon-apple">
                      <FontAwesomeIcon icon={faApple} />
                    </i>
                    <i className="icon-apple">
                      <FontAwesomeIcon icon={faApple} />
                    </i>
                  </a>
                </div>
                <div className="clear"></div>
                <div className="divider divider-center my-2">
                  <span>OR</span>
                </div> */}

                <div className="col-12 form-group">
                  <label
                    className="nott ls0 fw-normal mb-1"
                    htmlFor="login-form-username"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    id="login-form-username"
                    className="form-control fw-semibold"
                    placeholder="Username"
                    value={login}
                    onChange={(data) => setlogin(data.target.value)}
                  />
                </div>
                <div className="col-12 form-group">
                  <label
                    className="nott ls0 fw-normal mb-1"
                    htmlFor="login-form-firstname"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="login-form-firstname"
                    className="form-control fw-semibold"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(data) => setFirstName(data.target.value)}
                  />
                </div>
                <div className="col-12 form-group">
                  <label
                    className="nott ls0 fw-normal mb-1"
                    htmlFor="login-form-lastname"
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="login-form-lastname"
                    className="form-control fw-semibold"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(data) => setlastName(data.target.value)}
                  />
                </div>
                <div className="col-12 form-group">
                  <label
                    className="nott ls0 fw-normal mb-1"
                    htmlFor="login-form-email"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="login-form-email"
                    className="form-control fw-semibold"
                    placeholder="Email"
                    value={email}
                    onChange={(data) => setemail(data.target.value)}
                  />
                </div>
                <div className="clear"></div>
                <div className="col-12 form-group">
                  <label
                    className="nott ls0 fw-normal mb-1"
                    htmlFor="login-form-password"
                  >
                    Password:
                  </label>
                  <div className="input-group">
                    <input
                      id="login-form-password"
                      type="password"
                      className="form-control fw-semibold border-end-0"
                      placeholder="Password"
                      required=""
                      value={password}
                      onChange={(data) => setpassword(data.target.value)}
                    />
                    <button
                      onClick={() => {
                        showPassword();
                      }}
                      className="btn border"
                      type="button"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </div>
                {/* <div className="col-12 d-flex justify-content-between">
                  <div className="form-check form-check-inline"></div>
                  <a href="/" className="text-smaller fw-medium">
                    <u>Forgot Password?</u>
                  </a>
                </div> */}
                <div className="col-12 mt-4">
                  <button
                    className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
                    id="login-form-submit"
                    name="login-form-submit"
                    value="login"
                    onClick={() => {
                      RegisterAction();
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <p className="mb-0 mt-4 text-center fw-semibold">
                  You already have an account?
                  <Link to={"/login"}>
                    <u>Sign In</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default SignUp;
