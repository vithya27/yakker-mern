import React from "react";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import UsersList from "../components/UsersList";

const Admin = () => {
  return (
    <div className="app lg:max-w-6xl mx-auto grid grid-cols-9 max-h-screen overflow-hidden">
      <Sidebar />

      <UsersList />

      <Widgets />
    </div>
  );
};

export default Admin;
