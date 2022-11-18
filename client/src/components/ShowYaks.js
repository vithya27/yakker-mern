import React, { useState, useEffect } from "react";
import YakCard from "./YakCard";

const ShowYaks = ({ profile }) => {
  const [yaks, setYaks] = useState();
  const token = JSON.parse(localStorage.getItem("user"));
  const [deleteYak, setDeleteYak] = useState(null);

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
  }, [profile, deleteYak]);

  const onDelete = (post) => {
    let newPost = { post };
    setDeleteYak(newPost);
  };

  return (
    <div className="h-screen overflow-y-scroll">
      {yaks &&
        yaks.map((yak) => (
          <YakCard
            key={yak.id}
            yak={yak}
            profile={profile}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default ShowYaks;
