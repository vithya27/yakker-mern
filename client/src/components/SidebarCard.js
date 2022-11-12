import React from "react";

const SidebarCard = ({ Icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex group max-w-fit items-center space-x-2 px-5 py-5 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-50"
    >
      <Icon className="w-7 h-7" />
      <p className=" hidden md:inline-flex group-hover:text-yakker text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
};

export default SidebarCard;
