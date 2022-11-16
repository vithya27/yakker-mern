import React, { useEffect, useState } from "react";

const Conversation = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(chat);
    const userId = chat.members.find((id) => id !== currentUserId);

    const getUserData = async () => {};
  }, []);
  return <div></div>;
};

export default Conversation;
