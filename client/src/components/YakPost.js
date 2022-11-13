import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const YakPost = () => {
  const [input, setInput] = useState("");
  const { user } = useAuthContext();
  console.log(input);

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={user.payload.profilePic}
        alt="profile"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What's happening?"
          />
          <div className="flex items-center">
            <div className="flex flex-1"></div>
            <button
              disabled={!input}
              className="bg-yakker px-5 py-2 font-bold text-white rounded-full w-20 pointer-cursor disabled:opacity-40"
            >
              Yak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YakPost;
