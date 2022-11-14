const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
  },
  { timestamps: true },
  { collection: "users" }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
