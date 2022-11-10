import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellAlertIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-4 h-10 w-10"
        src="https://i.imgur.com/DpIsMdh.png"
        alt="logo"
      />
      <SidebarCard Icon={HomeIcon} title="Home" />
      <SidebarCard Icon={MagnifyingGlassIcon} title="Explore" />
      <SidebarCard Icon={BellAlertIcon} title="Notifications" />
      <SidebarCard Icon={EnvelopeIcon} title="Messages" />
    </div>
  );
};

export default Sidebar;
