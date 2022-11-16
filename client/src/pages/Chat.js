import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuthContext();
  const token = JSON.parse(localStorage.getItem("user"));

  const getMessages = async () => {
    const res = await fetch(`http://127.0.0.1:5001/chats/${user.payload.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setChats(data);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="app lg:max-w-6xl mx-auto grid grid-cols-9 max-h-screen overflow-hidden border-x">
        <Sidebar />

        <div className="col-span-2 mt-20 border-x border-y rounded">
          <div className="flex flex-col gap-4 rounded-lg p-4 h-auto text-2xl font-bold min-h-screen bg-white">
            <h2>Messages</h2>
            <div className="flex flex-col gap-4 text-lg font-normal">
              {chats.map((chat) => {
                <div>
                  <Conversation chat={chat} currentUser={user.payload.id} />
                </div>;
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-20 ml-5">Right Side</div>
      </div>
    </>
  );
};

export default Chat;
