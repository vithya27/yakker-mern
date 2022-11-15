const Comments = require("../models/Comments");

const createComment = async (req, res) => {
  try {
    if (!req.body.content) {
      console.log("Content param not sent with request");
      return res.status(400);
    }

    const createdComment = await Comments.create({
      content: req.body.content,
      userId: req.user.id,
      postId: req.body.postid,
    });

    console.log("created comment is: ", createdComment);
    res.json({ status: "okay", message: "comment created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getComments = async (req, res) => {
  const comments = await Comments.find({
    postId: req.params.id,
  }).sort({ createdAt: -1 });
  res.json(comments);
};

const deleteComment = async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.body.id) {
      await Comments.findByIdAndDelete(req.params.id);
    }
    res.json({ status: "okay", message: "comment deleted" });
  } catch (err) {
    console.log("DELETE/ comments/ delete", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};
