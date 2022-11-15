const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
  { collection: "posts" }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
