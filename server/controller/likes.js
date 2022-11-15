const Likes = require("../models/Likes");

const createLikes = async (req, res) => {
  try {
    await Likes.create({
      userId: req.user.id,
      postId: req.body.postid,
    });

    console.log("Like is created");
    res.json({ status: "okay", message: "like created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getLikes = async (req, res) => {
  const likes = await Likes.find({
    postId: req.params.id,
  }).sort({ createdAt: -1 });
  res.json(likes);
};

module.exports = {
  createLikes,
  getLikes,
};
