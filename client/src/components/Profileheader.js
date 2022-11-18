import React, { useEffect, useState } from "react";
import Timeago from "react-timeago";
import axios from "axios";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const Profileheader = ({ profile }) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yakker");

    axios
      .post("https://api.cloudinary.com/v1_1/dfwv9hdnq/image/upload", formData)
      .then((response) => {
        setImageUrl(response.data.url);
      });

    if (imageUrl !== null) {
      fetch(`http://127.0.0.1:5001/users/update/${token.payload.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.response.access}`,
        },
        body: JSON.stringify({ profilePic: imageUrl }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });

      const newData = JSON.stringify({
        payload: {
          id: token.payload.id,
          profilePic: imageUrl !== null ? imageUrl : token.payload.profilePic,
          role: token.payload.role,
          username: token.payload.username,
        },
        response: { access: token.response.access },
      });

      localStorage.setItem("user", newData);

      window.location.reload();
    }
  };

  return (
    <div className="border-y">
      <div>
        <div className="flex space-x-2 p-5">
          <img
            className="h-20 w-20 rounded-full object-cover mt-4"
            src={profile.profilePic}
            alt="profile"
          />
        </div>

        <div className="ml-5 flex flex-row">
          <p className="font-light">Change your profile picture: </p>
          <input
            className=" block w-72 ml-2 text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yakker file:text-white hover:file:bg-white hover:file:text-yakker"
            id="file_input"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button
            className="block h-7 bg-yakker text-sm text-white hover:bg-white hover:text-yakker rounded px-4 py-1"
            onClick={uploadImage}
          >
            Upload
          </button>
        </div>
      </div>

      <div>
        <p className="ml-5 font-bold">@{profile.username}</p>
      </div>
      <div className="flex items-center">
        <div className="flex mt-2 cursor-pointer items-center space-x-3">
          <CalendarDaysIcon className="ml-5 h-5 w-5" />
          <p className="ml-5 text-sm text-gray-500">
            Joined <Timeago date={profile.createdAt} />
          </p>
        </div>

        <div className="flex flex-1"></div>
        <button className="bg-yakker px-2 py-2 mr-5 mb-2 font-bold text-white rounded-full w-20 pointer-cursor disabled:opacity-40">
          Follow
        </button>
      </div>
    </div>
  );
};

export default Profileheader;
