import React from "react";
import Timeago from "react-timeago";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const UsersCard = ({ user, onDelete }) => {
  const token = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (id) => {
    fetch(`http://127.0.0.1:5001/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onDelete(data);
      });
    toast.error("User Deleted", { duration: 2000 });
  };

  return (
    <div className="flex justify-between overflow-y-scroll space-x-3 border-y border-gray-100 p-5">
      <div>
        <div className="flex space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.profilePic}
            alt="profile"
          />
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">@{user.username}</p>
            <p className="mr-1 text-sm text-gray-500">
              <Timeago date={user.createdAt} />
            </p>
          </div>
        </div>
        <div>
          <p className="ml-10 pt-1">E-mail: {user.email}</p>
        </div>
      </div>
      {user.role === "admin" ? null : (
        <div className="flex cursor-pointer items-center space-x-3 text-red-600  hover:text-red-500">
          <TrashIcon
            onClick={() => handleDelete(user._id)}
            className="h-10 w-10"
          />
        </div>
      )}
    </div>
  );
};

export default UsersCard;
