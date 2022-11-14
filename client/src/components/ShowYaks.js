import React, { useState, useEffect } from "react";
import YakCard from "./YakCard";

const ShowYaks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [yaks, setYaks] = useState();

  const fetchYaks = async () => {
    const res = await fetch(
      `http://127.0.0.1:5001/posts/posts?user=${user.payload.id}`
    );
    const json = await res.json();
    setYaks(json);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchYaks();
    }, 10000);
  }, []);

  return (
    <div className="h-screen overflow-y-scroll">
      {yaks && yaks.map((yak) => <YakCard key={yak.id} yak={yak} />)}
    </div>
  );
};

export default ShowYaks;
