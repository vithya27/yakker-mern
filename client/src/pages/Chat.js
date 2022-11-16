import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";
import ChatBox from "../components/ChatBox";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
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
  console.log(chats);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="app bg-gray-100 lg:max-w-6xl mx-auto grid grid-cols-9 max-h-screen overflow-hidden border-x">
        <Sidebar />

        <div className="col-span-2 ">
          <div className="flex flex-col gap-4 rounded-lg h-auto text-2xl font-bold min-h-screen bg-gray-100 overflow-y-scroll border-x">
            <h2 className="mt-5 ml-5">Messages</h2>
            <div className="flex flex-col gap-4 text-lg font-normal">
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation chat={chat} currentUserId={user.payload.id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded gap-4 mt-16 ml-5 w-96">
          <ChatBox chat={currentChat} currentUserId={user.payload.id} />
        </div>
      </div>
    </>
  );
};

export default Chat;
