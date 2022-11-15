const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
    role: { type: String, default: "general" },
  },
  { timestamps: true },
  { collection: "users" }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
