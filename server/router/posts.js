const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createPosts,
  allPosts,
  myPosts,
  deletePost,
} = require("../controller/posts");

router.put("/create", createPosts);

router.get("/allposts", protect, allPosts);

router.get("/:id", protect, myPosts);

router.delete("/:id", protect, deletePost);

module.exports = router;
