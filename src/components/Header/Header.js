import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "../../images/logo_final.png";

function Header() {
  const user = useSelector((state) => state.user) || {};

  const location = useLocation();
  const dispatch = useDispatch();
  const toggleMenu = () => {};

  if (
    location.pathname.toUpperCase().includes("ADMIN") &&
    user.role.includes("ADMIN")
  ) {
    return <></>;
  }
  return (
    <div
      style={{ overflowY: "hidden" }}
      className="stretched search-overlay has-plugin-bootstrap has-plugin-easing device-md"
    >
      <div id="wrapper" className="clearfix"></div>
      <header
        id="header"
        className="full-header header-size-md"
        data-mobile-sticky="true"
      >
        <div id="header-wrap">
          <div className="container">
            <div className="header-row">
              <div id="logo">
                <a href="/" className="standard-logo">
                  <img
                    style={{ backgroundColor: "transparent", border: 0 }}
                    src={logo}
                    alt="Canvas Logo"
                  />
                </a>
                <a href="/" className="retina-logo">
                  {<img src={logo} alt="Canvas Logo" />}
                </a>
              </div>

              {Object.keys(user).length === 0 || user == undefined ? (
                <div className="header-misc">
                  <button
                    onClick={() => window.location.assign("/")}
                    className="button button-border border-default px-4 rounded-1 fw-medium nott ls0 m-0 px-3 h-op-09"
                  >
                    Sign in
                  </button>
                </div>
              ) : (
                <div className="header-misc">
                  <button
                    style={{ color: "black" }}
                    onClick={() => {
                      window.location.assign("/" + user.role);
                    }}
                    className="button button-border border-default px-4 rounded-1 fw-medium nott ls0 m-0 px-3 h-op-09"
                  >
                    {user.role}
                  </button>
                  <button
                    style={{ color: "red" }}
                    onClick={() => {
                      dispatch({
                        type: "auth",
                        user: {},
                      });
                      window.location.assign("/");
                    }}
                    className="button button-border border-default px-4 rounded-1 fw-medium nott ls0 m-0 px-3 h-op-09"
                  >
                    Logout
                  </button>
                </div>
              )}
              <div
                id="primary-menu-trigger"
                onClick={() => {
                  toggleMenu();
                }}
              >
                <svg className="svg-trigger" viewBox="0 0 100 100">
                  <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                  <path d="m 30,50 h 40"></path>
                  <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
                </svg>
              </div>

              <nav className="primary-menu">
                <ul className="menu-container pe-0 pe-md-3">
                  <li
                    className={
                      location.pathname === "/"
                        ? "menu-item current"
                        : "menu-item"
                    }
                  >
                    <Link to={"/"} className="menu-link" href="demo-forum.html">
                      <div>Home</div>
                    </Link>
                  </li>
                  {Object.keys(user).length !== 0 || user == undefined ? (
                    <li
                      className={
                        location.pathname === "/profile"
                          ? "menu-item current"
                          : "menu-item"
                      }
                    >
                      <a className="menu-link" href="/profile">
                        <div>Profile</div>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </nav>
              <form
                className="top-search-form bg-alt dark"
                action="search.html"
                method="get"
              >
                <div className="container row justify-content-center">
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="q"
                      className="form-control form-control-lg mb-5 border-color"
                      value=""
                      placeholder="Type Your Query &amp; Hit Enter.."
                    />
                    <div className="row col-mb-30">
                      <div className="col-md-6">
                        <div className="widget widget_links clearfix">
                          <h4 className="">Recent Topics</h4>
                          <ul>
                            <li>
                              <a href="demo-forum-single.html">
                                Package Generator – Approx time for a file
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                Open sub-menu touching menu-item name
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                Portfolio Overlay Slide fadein fadeout
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                Show menu .dropdown-menu down only
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                Couldnt Generate Package Snippet
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget widget_links clearfix">
                          <h4 className="">Helpful Documentation</h4>
                          <ul>
                            <li>
                              <a href="demo-forum-single.html">
                                How to Install
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                How to setup Niche Demos
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">
                                Header Layouts and Styles
                              </a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">Setup Forms</a>
                            </li>
                            <li>
                              <a href="demo-forum-single.html">Setup RTL</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="header-wrap-clone"></div>
      </header>
    </div>
  );
}

export default Header;
