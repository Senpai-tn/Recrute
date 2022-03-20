import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import Spinner from "../../images/spinner.gif";
import Modal from "react-modal/lib/components/Modal";
function SignIn() {
  const dispatch = useDispatch();
  var user = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  var isLoading = useSelector((state) => state.isLoading);
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

  const SignInAction = (event) => {
    event.preventDefault();
    dispatch({ type: "loading", isLoading: true });
    axios
      .post("http://localhost:5000/login", {
        login: login,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "loading", isLoading: false });
        dispatch({ type: "auth", user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
        setError("");
        window.location.assign("/");
      })
      .catch((error) => {
        dispatch({ type: "loading", isLoading: false });
        if (error.message != "Network Error") {
          switch (error.request.status) {
            case 404:
              setError("Not Found");

              break;
            case 402:
              setError("Password does not match");
              break;
            case 403:
              setError("User Deleted");
              break;
            default:
              break;
          }
        } else {
          alert("Network Error");
        }
      });
  };
  return (
    <section id="content">
      <Modal isOpen={isLoading} className="Modal" overlayClassName="Overlay">
        <img alt="spinner" src={Spinner} />
      </Modal>
      <div className="content-wrap py-0">
        <div className="section m-0">
          <div className="curve-bg"></div>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="cs-signin-form">
              <div className="cs-signin-form-inner">
                <div className="text-center">
                  <h3 className="h1 fw-bolder mb-3">Sign In</h3>

                  <p
                    className="text-smaller text-muted mb-4"
                    style={{ lineHeight: 1.5 }}
                  >
                    <p className="divider divider-center my-2">
                      <span>With</span>
                    </p>
                  </p>
                </div>
                <div className="d-flex justify-content-center mb-2">
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
                </div>
                <form onSubmit={SignInAction}>
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
                      onChange={(data) => {
                        setLogin(data.target.value);
                      }}
                      style={{
                        backgroundColor:
                          error == "Not Found" || error == "User Deleted"
                            ? "red"
                            : "white",
                      }}
                    />
                    <pre style={{ color: "red", fontWeight: "bolder" }}>
                      {error == "Not Found" || error == "User Deleted"
                        ? error
                        : ""}
                    </pre>
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
                        required
                        id="login-form-password"
                        type="password"
                        className="form-control fw-semibold border-end-0"
                        placeholder="Password"
                        style={{
                          backgroundColor:
                            error == "Password does not match"
                              ? "red"
                              : "white",
                        }}
                        value={password}
                        onChange={(data) => {
                          setPassword(data.target.value);
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
                    <pre style={{ color: "red", fontWeight: "bolder" }}>
                      {error == "Password does not match" ? error : ""}
                    </pre>
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <div className="form-check form-check-inline"></div>
                    <a href="/" className="text-smaller fw-medium">
                      <u>Forgot Password?</u>
                    </a>
                  </div>
                  <div className="col-12 mt-4">
                    <input
                      type={"submit"}
                      className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
                      id="login-form-submit"
                      name="login-form-submit"
                      value="login"
                    />
                  </div>
                </form>

                <p className="mb-0 mt-4 text-center fw-semibold">
                  Don't have an account ?{"   "}
                  <Link to={"/register"} state={{ type: "CANDIDATE" }}>
                    <u>Sign up</u>
                  </Link>
                </p>
                <p className="mb-0 mt-4 text-center fw-semibold">
                  Sign up as HR{"   "}
                  <Link to={"/register"} state={{ type: "HR" }}>
                    <u>Sign up</u>
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

export default SignIn;
