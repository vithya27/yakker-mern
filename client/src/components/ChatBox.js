import React, { useEffect, useState } from "react";
import Timeago from "react-timeago";

const ChatBox = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () =>
      fetch(`http://127.0.0.1:5001/users/finduserbyid/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.response.access}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          console.log(data);
        });
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      await fetch(`http://127.0.0.1:5001/messages/${chat._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.response.access}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMessages(data);
        });
    };
    console.log(messages);
    if (chat !== null) fetchMessages();
  }, [chat]);
  return (
    <>
      <div className="">
        <>
          <div className="mt-2">
            <div className="follower">
              <div>
                <div className="flex flex-row ml-2 items-center">
                  <img
                    className="h-10 w-10"
                    src={userData?.profilePic}
                    alt=""
                  />
                  <div className="flex flex-col ml-2 text-base font-bold">
                    <span>{userData?.username}</span>
                  </div>
                </div>
              </div>
              <hr className="mt-2" />
            </div>
            <div></div>
            {messages.map((message) => (
              <>
                <div
                  className={
                    message.senderId === currentUserId
                      ? "self-end flex flex-col ml-5 mt-5 bg-teal-600 text-white w-fit p-5 rounded-lg"
                      : "flex flex-col bg-lime-100 gap-4 rounded-lg p-4 h-auto overflow-scroll"
                  }
                >
                  <span>{message.text}</span>
                  <span className="text-xs text-gray-200">
                    <Timeago date={message.createdAt} />
                  </span>
                </div>
              </>
            ))}
          </div>
        </>
      </div>
    </>
  );
};

export default ChatBox;
