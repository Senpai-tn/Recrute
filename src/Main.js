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

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import CheckOffer from "./components/ADMIN/CheckOffer/CheckOffer";

function Main() {
  var localData = JSON.parse(localStorage.getItem("user"));

  if (localData == null) {
    localStorage.setItem("user", "{}");
    localData = {};
  }
  const [user, setUser] = useState(localData);

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
            {Object.keys(user).length === 0 || user == null ? (
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
            ) : user.role == "ADMIN" ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/addOffer" element={<AddOffer />} />
                <Route path="/ADMIN" element={<Admin />} />
                <Route path="/HR" element={<RH />} />
                <Route path="/checkoffer/:id" element={<RH />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : user.role == "HR" ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/HR" element={<RH />} />
                <Route path="/ADMIN" element={<Admin />} />
                <Route path="/addoffer" element={<AddOffer />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/checkoffer/:id" element={<CheckOffer />} />
                <Route path="/" element={<Home />} />
                <Route path="/HR" element={<RH />} />
                <Route path="/ADMIN" element={<Admin />} />
                <Route path="/addoffer" element={<AddOffer />} />
                <Route path="/offer" element={<OfferInfo />} />
                <Route path="/quiz" element={<Quiz />} />
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
