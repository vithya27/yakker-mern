import React, { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import YakPost from "./YakPost";
import ShowYaks from "./ShowYaks";
import Profileheader from "./Profileheader";

const MyYaks = () => {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Profile</h1>
      </div>
      <div>
        <Profileheader />
      </div>
      <div>
        <YakPost />
      </div>
      <div>
        <ShowYaks />
      </div>
    </div>
  );
};

export default MyYaks;
