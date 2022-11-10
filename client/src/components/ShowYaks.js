import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const ShowYaks = () => {
  return (
    <div className="flex flex-col overflow-y-scroll space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img className="h-10 w-10 rounded-full object-cover" src="" alt="" />

        <div className="flex items-center space-x-1">
          <p className="mr-1 font-bold"></p>
        </div>
      </div>
      <div>
        <p className="ml-10 pt-1"></p>
      </div>

      <div className="mt-5 flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          <p></p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ShowYaks;
