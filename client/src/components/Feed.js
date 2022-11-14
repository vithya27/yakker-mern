import React, { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import YakPost from "./YakPost";
import ShowAllYaks from "./ShowAllYaks";

const Feed = () => {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
      </div>
      
      <div>
        {/*create state in feed, pass set state to yakpost, on submit set the state to whatever's submitted*/}

        <YakPost />
      </div>
      <div>
        <ShowAllYaks />
      </div>
    </div>
  );
};

export default Feed;
