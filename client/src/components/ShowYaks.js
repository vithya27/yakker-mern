import React, { useState, useEffect } from "react";
import YakCard from "./YakCard";

const ShowYaks = ({ profile }) => {
  const [yaks, setYaks] = useState();
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/posts/${profile._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setYaks(data);
      });
  }, [profile]);

  return (
    <div className="h-screen overflow-y-scroll">
      {yaks &&
        yaks.map((yak) => <YakCard key={yak.id} yak={yak} profile={profile} />)}
    </div>
  );
};

export default ShowYaks;
