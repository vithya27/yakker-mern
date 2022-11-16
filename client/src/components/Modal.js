import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Modal = ({ visible, onClose, yakId }) => {
  const [newComment, setNewComment] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5001/comments/create`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.response.access}`,
      },
      body: JSON.stringify({ content: newComment, postid: yakId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
    onClose();
    toast.success("Comment posted", { duration: 2000 });

    setNewComment("");
  };

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Comment
        </h1>
        <p className="text-center text-gray-500 mb-5">Remember to be nice!</p>
        <div className="flex flex-col">
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            className="border border-gray-700 p-2 rounded mb-5 text-gray-700"
            placeholder="Type your comment here"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-yakker text-white rounded"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
