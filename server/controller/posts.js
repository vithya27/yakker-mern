const Posts = require("../models/Posts");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createPosts = async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400);
    }

    const createdPost = await Posts.create({
      content: req.body.content,
      userId: req.body.userid,
    });

    res.json({ status: "okay", message: "post created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const myPosts = async (req, res) => {
  const posts = await Posts.aggregate([
    { $match: { userId: ObjectId(`${req.params.id}`) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
  ]).sort({ createdAt: -1 });
  res.json(posts);
};

const allPosts = async (req, res) => {
  // const posts = await Posts.find().sort({ createdAt: -1 });
  const posts = await Posts.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
  ]).sort({ createdAt: -1 });

  res.json(posts);
};

const deletePost = async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.email === req.body.email) {
      await Posts.findByIdAndDelete(req.params.id);

      res.json({ status: "okay", message: "post deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

module.exports = {
  createPosts,
  myPosts,
  allPosts,
  deletePost,
};
