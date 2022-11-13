import React, { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import YakCard from "./YakCard";

const ShowYaks = () => {
  const { user } = useAuthContext();
  const [yaks, setYaks] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/posts/posts?user=${user.payload.id}`)
      .then((response) => response.json())
      .then((response) => {
        setYaks(response);
      });
  }, [user]);
  console.log(yaks);

  return <>{yaks && yaks.map((yak) => <YakCard key={yak.id} yak={yak} />)}</>;
};

export default ShowYaks;
