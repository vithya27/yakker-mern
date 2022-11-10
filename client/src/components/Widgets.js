import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className=" col-span-2 mt-2 hidden px-2 lg:inline">
      <div className="flex mt-2 mb-2 items-center space-x-2 rounded-full bg-gray-50 p-3">
        <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Yakker"
          className="bg-transparent flex-1 outline-none"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="goodnewsnetwork"
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widgets;
