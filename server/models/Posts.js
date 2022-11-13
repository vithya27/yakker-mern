const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    content: { type: String },
    postedBy: { type: Object },
    pinned: Boolean,
  },
  { timestamps: true },
  { collection: "posts" }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
