import React from "react";
import Timeago from "react-timeago";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const Profileheader = ({ profile }) => {
  console.log(profile);
  return (
    <div className="border-y">
      <div>
        <div className="flex space-x-2 p-5">
          <img
            className="h-20 w-20 rounded-full object-cover mt-4"
            src={profile.profilePic}
            alt="profile"
          />
        </div>
        <button className="bg-slate-100 ml-5 px-2 py-2 mr-5 mb-2 font-light text-sm text-black rounded w-20 pointer-cursor disabled:opacity-40">
          Update Picture
        </button>
      </div>

      <div>
        <p className="ml-5 font-bold">@{profile.username}</p>
      </div>
      <div className="flex items-center">
        <div className="flex mt-2 cursor-pointer items-center space-x-3">
          <CalendarDaysIcon className="ml-5 h-5 w-5" />
          <p className="ml-5 text-sm text-gray-500">
            Joined <Timeago date={profile.createdAt} />
          </p>
        </div>

        <div className="flex flex-1"></div>
        <button className="bg-yakker px-2 py-2 mr-5 mb-2 font-bold text-white rounded-full w-20 pointer-cursor disabled:opacity-40">
          Follow
        </button>
      </div>
    </div>
  );
};

export default Profileheader;
