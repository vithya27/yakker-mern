const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", Messages);

module.exports = Messages;
