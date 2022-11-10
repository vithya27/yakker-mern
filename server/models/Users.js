const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
  },
  { collection: "users" }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
