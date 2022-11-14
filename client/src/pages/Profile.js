import React from "react";
import Sidebar from "../components/Sidebar";
import MyYaks from "../components/MyYaks";
import Widgets from "../components/Widgets";

const Home = () => {
  return (
    <div className="app lg:max-w-6xl mx-auto grid grid-cols-9 max-h-screen overflow-hidden">
      <Sidebar />

      <MyYaks />

      <Widgets />
    </div>
  );
};

export default Home;
