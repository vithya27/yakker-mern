import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";
import ChatBox from "../components/ChatBox";
import { useAuthContext } from "../hooks/useAuthContext";
import { io } from "socket.io-client";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const { user } = useAuthContext();
  const token = JSON.parse(localStorage.getItem("user"));
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user.payload.id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

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

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="app bg-gray-100 lg:max-w-6xl mx-auto grid grid-cols-9 h-screen overflow-y-scroll border-x">
        <Sidebar />

        <div className="col-span-3">
          <div className="flex flex-col gap-4 rounded-lg text-2xl font-bold bg-gray-100 border-x">
            <h2 className="mt-5 ml-5">Messages</h2>
            <div className="flex flex-col gap-4 text-lg font-normal">
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    chat={chat}
                    currentUserId={user.payload.id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded gap-4 mt-16 ml-5 mb-5 w-96 h-96 overflow-y-scroll">
          <ChatBox
            chat={currentChat}
            currentUserId={user.payload.id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
