const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", ChatSchema);

module.exports = Chats;
