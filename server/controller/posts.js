const Posts = require("../models/Posts");

const createPosts = async (req, res) => {
  try {
    if (!req.body.content) {
      console.log("Content param not sent with request");
      return res.status(400);
    }

    const createdPost = await Posts.create({
      content: req.body.content,
      userId: req.body.userid,
    });

    console.log("created post is: ", createdPost);
    res.json({ status: "okay", message: "post created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const myPosts = async (req, res) => {
  const posts = await Posts.find({
    "postedBy.id": req.query.user,
  }).sort({ createdAt: -1 });
  res.json(posts);
};

const allPosts = async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: -1 });
  res.json(posts);
};

const deletePost = async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.body.id) {
      await Posts.findByIdAndDelete(req.params.id);
    }
    res.json({ status: "okay", message: "post deleted" });
  } catch (err) {
    console.log("DELETE/ posts/ delete", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

module.exports = {
  createPosts,
  myPosts,
  allPosts,
  deletePost,
};
