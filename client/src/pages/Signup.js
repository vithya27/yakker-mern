import React, { useState } from "react";
import LoginNavBar from "../components/LoginNavBar";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isLoading } = useSignup();
  const [click, setClick] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, username);
    setEmail("");
    setPassword("");
    setUsername("");
    setClick(true);
  };
  return (
    <>
      <LoginNavBar />
      <div className="flex flex-col items-center justify-center w-full">
        <img
          className="h-20 w-20 rounded-full object-cover mt-8 mb-4"
          src="https://i.imgur.com/l2jU7WX.png"
          alt=""
        />
        <form
          className="flex flex-col items-center justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4 text-3xl font-bold tracking-tight leading-none text-yakker md:text-4xl lg:text-5xl">
            Sign Up
          </h3>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:{" "}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:{" "}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your e-mail"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:{" "}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              className="bg-yakker hover:bg-white hover:text-yakker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 mt-5 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{error}</strong>
                <span className="block sm:inline"> Please try again.</span>
              </div>
            )}

            {click && !error && (
              <div
                className="p-4 mb-4 mt-5 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="font-medium">Congratulations!</span> Your
                account has been created successfully.
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
