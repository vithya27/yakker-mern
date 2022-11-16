import React, { useEffect, useState } from "react";
import UsersCard from "./UsersCard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"));

  const getUsers = async () => {
    const res = await fetch(`http://127.0.0.1:5001/users/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.response.access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getUsers();
  }, [deleteUser]);

  const onDelete = (user) => {
    let newUser = { user };
    setDeleteUser(newUser);
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-center">
        <h1 className="p-5 pb-0 text-xl font-bold">Admin Access Only</h1>
      </div>

      <div className="mt-5 h-96 overflow-y-scroll">
        {users &&
          users.map((user) => (
            <UsersCard key={user._id} user={user} onDelete={onDelete} />
          ))}
      </div>
    </div>
  );
};

export default UsersList;
