import React, { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import YakCard from "./YakCard";

const ShowYaks = () => {
  const { user } = useAuthContext();
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
    }, 5000);
  }, [yaks]);

  return (
    <div className="h-screen overflow-y-scroll">
      {yaks && yaks.map((yak) => <YakCard key={yak.id} yak={yak} />)}
    </div>
  );
};

export default ShowYaks;
