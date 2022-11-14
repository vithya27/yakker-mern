import React, { useEffect } from "react";
import Timeago from "react-timeago";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const Profileheader = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="border-solid border-2 border-slate-200 py-1">
      <div className="flex space-x-2 p-5">
        <img
          className="h-14 w-14 rounded-full object-cover mt-4"
          src={currentUser.payload.profilePic}
          alt="profile"
        />
      </div>

      <div>
        <p className="ml-5 font-bold">
          @{currentUser.payload.email.split("@")[0]}
        </p>
      </div>
      <div>
        <p className="ml-5 text-sm text-gray-500">
          <div className="flex mt-2 cursor-pointer items-center space-x-3">
            <CalendarDaysIcon className="h-5 w-5" />
            <p>
              Joined <Timeago date={currentUser.payload.createdAt} />
            </p>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Profileheader;
