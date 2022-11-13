import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellAlertIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SidebarCard from "./SidebarCard";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-4 h-10 w-10"
        src="https://i.imgur.com/DpIsMdh.png"
        alt="logo"
      />
      <Link to="/">
        <SidebarCard Icon={HomeIcon} title="Home" />
      </Link>

      <SidebarCard Icon={MagnifyingGlassIcon} title="Explore" />
      <SidebarCard Icon={BellAlertIcon} title="Notifications" />
      <SidebarCard Icon={EnvelopeIcon} title="Messages" />
      <Link to="/profile">
        <SidebarCard Icon={UserIcon} title="Profile" />
      </Link>
      <SidebarCard
        Icon={ArrowRightOnRectangleIcon}
        title="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
