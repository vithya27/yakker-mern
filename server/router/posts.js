const express = require("express");
const router = express.Router();

const {
  createPosts,
  allPosts,
  myPosts,
  deletePost,
} = require("../controller/posts");

router.put("/create", createPosts);

router.get("/allposts", allPosts);

router.get("/posts", myPosts);

router.delete("/:id", deletePost);

module.exports = router;
