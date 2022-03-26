import React, { useEffect } from "react";
import ListOffers from "../Offers/ListOffers";
import { Dashboard as ADMIN } from "../ADMIN/Dashboard/Dashboard";
import { Dashboard as RH } from "../RH/Dashboard/Dashboard";
import Forbidden from "../Forbidden/Forbidden";
function Home() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ flex: 1, minHeight: "100vh" }}>
      <ListOffers />
    </div>
  );
}

export default Home;
