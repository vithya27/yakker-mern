const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Posts",
    },
  },
  { collection: "likes" }
);

const Likes = mongoose.model("Likes", LikesSchema);

module.exports = Likes;
