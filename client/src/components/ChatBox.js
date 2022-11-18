import React, { useEffect, useState, useRef } from "react";
import Timeago from "react-timeago";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

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
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };

    const res = await fetch(`http://127.0.0.1:5001/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.response.access}`,
      },
      body: JSON.stringify(message),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage("");
      });

    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId });
  };

  // scroll to most recent message

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="h-96">
        {chat ? (
          <>
            <div className="mt-2">
              <div className="flex flex-col h-80">
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
                <div className="flex flex-col">
                  <div
                    ref={scroll}
                    className={
                      message.senderId !== currentUserId
                        ? "flex flex-col ml-5 mt-5 bg-teal-600 text-white w-fit p-5 rounded-lg"
                        : "flex flex-col ml-5 mt-5 mr-5 bg-lime-100 rounded-lg p-5 w-fit self-end"
                    }
                  >
                    <span>{message.text}</span>
                    <span
                      className={
                        message.senderId !== currentUserId
                          ? "text-xs text-gray-300 self-end"
                          : "text-xs text-gray-800 self-end"
                      }
                    >
                      <Timeago date={message.createdAt} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white flex justify-between h-12 items-center gap-4 p-3 rounded-lg self-end">
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div>
                <button onClick={handleSend}>Send</button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-5 text-gray-700">
            <span>Tap on a chat to send a message</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;
