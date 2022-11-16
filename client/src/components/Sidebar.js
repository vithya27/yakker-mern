import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellAlertIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import SidebarCard from "./SidebarCard";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-4 h-10 w-10"
        src="https://i.imgur.com/l2jU7WX.png"
        alt="logo"
      />
      <Link to="/">
        <SidebarCard Icon={HomeIcon} title="Home" />
      </Link>

      <SidebarCard Icon={MagnifyingGlassIcon} title="Explore" />
      <SidebarCard Icon={BellAlertIcon} title="Notifications" />
      <Link to="/messages">
        <SidebarCard Icon={EnvelopeIcon} title="Messages" />
      </Link>

      {user && user.payload.role === "admin" ? (
        <Link to="/admin">
          <SidebarCard Icon={NoSymbolIcon} title="Admin" />
        </Link>
      ) : (
        <Link to="/profile">
          <SidebarCard Icon={UserIcon} title="Profile" />
        </Link>
      )}

      <SidebarCard
        Icon={ArrowRightOnRectangleIcon}
        title="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
