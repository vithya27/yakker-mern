import React, { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import YakPost from "./YakPost";
import ShowYaks from "./ShowYaks";
import Profileheader from "./Profileheader";

const MyYaks = () => {
  const [profile, setProfile] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://127.0.0.1:5001/users/finduser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      });
  }, []);

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Profile</h1>
      </div>
      {profile && (
        <div>
          <Profileheader profile={profile} />
        </div>
      )}
      {profile && (
        <div>
          <ShowYaks profile={profile} />
        </div>
      )}
    </div>
  );
};

export default MyYaks;
