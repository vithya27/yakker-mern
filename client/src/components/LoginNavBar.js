import React from "react";
import { Link } from "react-router-dom";

const LoginNavBar = () => {
  return (
    <header>
      <div>
        <nav className="relative w-full flex flex-wrap items-center justify-around py-4 bg-gray-100 text-gray-500 shadow-lg">
         

          <Link to="/login">
            <h1 className=" hover:text-yakker focus:text-yakker ">Login</h1>
          </Link>
          <Link to="/signup">
            <h1 className=" hover:text-yakker focus:text-yakker ">Sign Up</h1>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LoginNavBar;
