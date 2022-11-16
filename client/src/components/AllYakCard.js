import React, { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Timeago from "react-timeago";

const AllYakCard = ({ yak }) => {
  const [comments, setComments] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"));

  const refreshComments = async () => {
    const res = await fetch(`http://127.0.0.1:5001/comments/${yak._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
    console.log(yak._id, comments);
  };

  useEffect(() => {
    refreshComments();
    console.log(comments);
  }, []);
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
            <p>{comments.length}</p>
          </div>

          <div className="flex cursor-pointer items-center space-x-3 text-gray-400  hover:text-yakker">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400  hover:text-yakker">
            <HeartIcon className="h-5 w-5" />
          </div>
        </div>
        {comments?.length > 0 && (
          <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
            {comments.map((comment) => (
              <div className="flex space-x-2" key={comment._id}>
                <hr className="relative left-6 top-9 h-10 border-x border-yak/30" />
                <img
                  className=" mt-2 h-7 w-7 rounded-full object-cover"
                  src={comment.user[0].profilePic}
                  alt="pic"
                />
                <div className="">
                  <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">
                      @{comment.user[0].username}
                    </p>
                    <Timeago
                      className="text-sm text-gray-500"
                      date={comment.createdAt}
                    />
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllYakCard;
