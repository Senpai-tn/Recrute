import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import OfferInfo from "./components/OfferInfo/OfferInfo";
import AddOffer from "./components/Offers/AddOffer/AddOffer";
import Quiz from "./components/Quiz/Quiz";
import { Dashboard as RH } from "./components/RH/Dashboard/Dashboard";
import { Dashboard as Admin } from "./components/ADMIN/Dashboard/Dashboard";
import Spinner from "./images/spinner.gif";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import CheckOffer from "./components/ADMIN/CheckOffer/CheckOffer";
import GetCandidates from "./components/RH/GetCandidates/GetCandidates";
import { useSelector } from "react-redux";
import Modal from "react-modal/lib/components/Modal";
import Offers from "./components/ADMIN/Offers/Offers";
import Profile from "./components/Profile/Profile";
import Forbidden from "./components/Forbidden/Forbidden";

function Main() {
  var localData = JSON.parse(localStorage.getItem("user"));

  if (localData == null) {
    localStorage.setItem("user", "{}");
    localData = {};
  }
  const [user, setUser] = useState(localData);
  var isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <div>
        <Router>
          <Header></Header>
          <div
            style={{
              minHeight: window.innerHeight - 250,
            }}
          >
            <Modal
              isOpen={isLoading}
              className="Modal"
              overlayClassName="Overlay"
            >
              <img alt="spinner" src={Spinner} />
            </Modal>
            {Object.keys(user).length === 0 || user === null ? (
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
            ) : user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/addOffer" element={<AddOffer />} />
                <Route path="/ADMIN" element={<Admin />} />
                <Route path="/SUPER_ADMIN" element={<Admin />} />
                <Route path="/HR" element={<RH />} />
                <Route path="/checkoffer/:id" element={<CheckOffer />} />
                <Route path="/getCandidates" element={<GetCandidates />} />
                <Route path="/admin/offers" element={<Offers />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : user.role == "HR" ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/HR" element={<RH />} />
                <Route path="/getCandidates" element={<GetCandidates />} />
                <Route path="/addoffer" element={<AddOffer />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addoffer" element={<AddOffer />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/getCandidates" element={<GetCandidates />} />
                <Route path="/addOffer" element={<Forbidden />} />

                <Route path="/ADMIN" element={<Forbidden />} />

                <Route path="/SUPER_ADMIN" element={<Forbidden />} />

                <Route path="/HR" element={<Forbidden />} />

                <Route path="/checkoffer/:id" element={<Forbidden />} />

                <Route path="/getCandidates" element={<Forbidden />} />

                <Route path="/admin/offers" element={<Forbidden />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </div>
        </Router>

        <Footer />
      </div>
    </div>
  );
}

export default Main;
