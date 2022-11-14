import React, { useState } from "react";
import { usePost } from "../hooks/usePost";
import { toast } from "react-hot-toast";

const YakPost = () => {
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { post } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const refreshToast = toast.loading("New Yak coming up");
    await post(content);
    toast.success("Yak Posted", { id: refreshToast });

    setContent("");
  };

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
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What's happening?"
          />
          <div className="flex items-center">
            <div className="flex flex-1"></div>
            <button
              disabled={!content}
              onClick={handleSubmit}
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
