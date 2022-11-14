const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    content: { type: String },
    postedBy: { type: Object },
    yakPostID: { type: String },
  },
  { timestamps: true },
  { collection: "comments" }
);

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
