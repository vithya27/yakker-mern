const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    content: { type: String },
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
  { timestamps: true },
  { collection: "comments" }
);

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
