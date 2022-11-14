import React, { useState, useEffect } from "react";
import AllYakCard from "./AllYakCard";

const ShowAllYaks = ({ yaks }) => {
  return (
    <div className="h-screen overflow-y-scroll">
      {yaks && yaks.map((yak) => <AllYakCard key={yak.id} yak={yak} />)}
    </div>
  );
};

export default ShowAllYaks;
