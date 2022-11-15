import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Timeago from "react-timeago";

const YakCard = ({ yak, profile }) => {
  const token = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (postid) => {
    console.log(JSON.stringify({ email: profile.email }));
    await fetch(`http://127.0.0.1:5001/posts/${postid}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token.response.access,
      },
      body: JSON.stringify({ email: profile.email }),
    })
      .then((response) => console.log(response.status))
      .catch((error) => console.error(error));
  };

  const handleLike = async (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="flex flex-col overflow-y-scroll space-x-3 border-y border-gray-100 p-5">
        <div className="flex space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={yak.user[0].profilePic}
            alt="profile"
          />

          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">@{yak.user[0].username}</p>
            <p className="mr-1 text-sm text-gray-500">
              <Timeago date={yak.createdAt} />
            </p>
          </div>
        </div>
        <div>
          <p className="ml-10 pt-1">{yak.content}</p>
        </div>

        <div className="mt-5 flex justify-between">
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400 hover:text-yakker">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <p></p>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400  hover:text-yakker">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400  hover:text-yakker">
            <HeartIcon
              className="h-5 w-5"
              onClick={() => handleLike(yak._id)}
            />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400  hover:text-red-500">
            <TrashIcon
              onClick={() => handleDelete(yak._id)}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default YakCard;
