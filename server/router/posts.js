const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createPost, allPosts, deletePost } = require("../controller/posts");

router.put("/create", createPost);

router.get("/posts", allPosts);

router.delete("/delete", auth, deletePost);

module.exports = router;
