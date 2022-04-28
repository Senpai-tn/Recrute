import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import User from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import "./SignUp.css";
import Spinner from "../../images/spinner.gif";
import Footer from "../Footer/Footer";
import Modal from "react-modal/lib/components/Modal";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [login, setlogin] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { type } = location.state;
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [checkLength, setLength] = useState(false);
  var isLoading = useSelector((state) => state.isLoading);

  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

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
    if (!lower || !upper || !number || !checkLength) {
      return;
    }
    var user = new User(login, firstName, lastName, password, email, type);
    dispatch({ type: "loading", isLoading: true });
    axios
      .post("http://localhost:5000/register", { user: user })
      .then((res) => {
        dispatch({ type: "loading", isLoading: false });

        dispatch({ type: "auth", user: res.data });
        window.location.assign("/");
      })
      .catch((error) => {
        dispatch({ type: "loading", isLoading: false });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    RegisterAction();
  };
  return (
    <section id="content">
      <Modal isOpen={isLoading} className="Modal" overlayClassName="Overlay">
        <img alt="spinner" src={Spinner} />
      </Modal>
      <div className="content-wrap py-0">
        <div className="section m-0">
          <div className="curve-bg"></div>
          <form onSubmit={onSubmit}>
            <div className="container d-flex justify-content-center align-items-center">
              <div className="cs-signin-form">
                <div className="cs-signin-form-inner">
                  <div className="text-center">
                    <h3 className="h1 fw-bolder mb-3">Sign Up</h3>
                  </div>
                  <div className="col-12 form-group">
                    <label
                      className="nott ls0 fw-normal mb-1"
                      htmlFor="login-form-username"
                    >
                      Username:
                    </label>
                    <input
                      required
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
                      required
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
                      required
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
                      required
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
                        required
                        value={password}
                        onChange={(data) => {
                          if (
                            data.target.value.match(lowerCaseLetters) == null
                          ) {
                            setLower(false);
                          } else {
                            setLower(true);
                          }

                          if (
                            data.target.value.match(upperCaseLetters) == null
                          ) {
                            setUpper(false);
                          } else {
                            setUpper(true);
                          }

                          if (data.target.value.match(numbers) == null) {
                            setNumber(false);
                          } else {
                            setNumber(true);
                          }

                          if (data.target.value.length < 8) {
                            setLength(false);
                          } else {
                            setLength(true);
                          }
                          setpassword(data.target.value);
                        }}
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
                  <div>
                    <table style={{ textAlign: "left" }}>
                      <tr>
                        <td
                          className={`message ${
                            checkLength ? "valid" : "error"
                          }`}
                        >
                          Length{" "}
                          {checkLength ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className={`message ${lower ? "valid" : "error"}`}>
                          Lower{" "}
                          {lower ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className={`message ${upper ? "valid" : "error"}`}>
                          Upper{" "}
                          {lower ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className={`message ${number ? "valid" : "error"}`}>
                          Number{" "}
                          {lower ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} />
                          )}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-12 mt-4">
                    <input
                      type={"submit"}
                      className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
                      id="login-form-submit"
                      name="login-form-submit"
                      value="Sign Up"
                    />
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
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default SignUp;
