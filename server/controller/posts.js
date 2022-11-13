const Posts = require("../models/Posts");

const createPosts = async (req, res) => {
  try {
    if (!req.body.content) {
      console.log("Content param not sent with request");
      return res.status(400);
    }

    const createdPost = await Posts.create({
      content: req.body.content,
      postedBy: req.body.user.payload.id,
    });

    console.log("created user is: ", createdPost);
    res.json({ status: "okay", message: "post created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const allPosts = async (req, res) => {
  const posts = await Posts.find();
  res.json(posts);
};

const deletePost = async (req, res) => {
  try {
    await Posts.deleteOne({ email: req.body.email });
    res.json({ status: "okay", message: "post deleted" });
  } catch (err) {
    console.log("DELETE/ posts/ delete", err);
    // keep error messages generic. front-end should not know. may be more prone to hacking if they know what the issue is.
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};
module.exports = {
  createPosts,
  allPosts,
  deletePost,
};
