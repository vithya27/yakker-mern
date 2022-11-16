import React, { useEffect, useState } from "react";

const Conversation = ({ chat, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentUserId);

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
  }, []);

  return (
    <>
      <div className="bg-white p-2 ml-5 mr-5 rounded hover:bg-lime-100">
        <div>
          <div className="flex flex-row justify-around items-center">
            <img className="h-10 w-10" src={userData?.profilePic} alt="" />
            <div className="flex flex-col text-base font-bold">
              <span>{userData?.username}</span>
              <span className="text-sm text-gray-500 font-light">
                {online && online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
};

export default Conversation;
