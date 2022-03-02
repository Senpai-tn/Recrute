import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import OfferInfo from "./components/OfferInfo/OfferInfo";
import AddOffer from "./components/Offers/AddOffer/AddOffer";
import Quiz from "./components/Quiz/Quiz";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

function Main() {
  var localData = JSON.parse(localStorage.getItem("user"));
  if (localData == null) {
    localStorage.setItem("user", "{}");
    localData = {};
  }
  const [user, setUser] = useState(localData);

  return (
    <div className="App">
      <div style={{ marginTop: 15 }}>
        <Router>
          <Header></Header>

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </div>
    </div>
  );
}

export default Main;
