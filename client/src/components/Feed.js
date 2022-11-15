import React, { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import YakPost from "./YakPost";
import ShowAllYaks from "./ShowAllYaks";

const Feed = () => {
  const [yaks, setYaks] = useState(null);
  const [input, setInput] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://127.0.0.1:5001/posts/allposts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setYaks(data);
      });
  }, [input]);

  console.log(yaks);

  const handleRefresh = async () => {
    window.location.reload();
  };

  const onPost = (post) => {
    let newPost = { post };
    setInput(newPost);
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="h-6 w-6 mr-5 mt-5 cursor-pointer transition-all duration-500 ease-out hover:rotate-180  hover:text-yakker active:scale-125"
        />
      </div>

      <div>
        <YakPost onPost={onPost} />
      </div>
      <div>{yaks && <ShowAllYaks yaks={yaks} />}</div>
    </div>
  );
};

export default Feed;
