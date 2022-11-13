const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    content: { type: String },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean,
  },
  { timestamps: true },
  { collection: "posts" }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
