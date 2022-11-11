import React from "react";
import { Link } from "react-router-dom";

const LoginNavBar = () => {
  return (
    <header>
      <div>
        <nav className="relative w-full flex flex-wrap justify-end space-x-5 py-4 bg-yakker text-white shadow-lg">
          <Link to="/login">
            <h1 className=" hover:text-black focus:text-yakker">Login</h1>
          </Link>
          <Link to="/signup">
            <h1 className=" hover:text-black focus:text-yakker mr-10">
              Sign Up
            </h1>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LoginNavBar;
