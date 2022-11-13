const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { createPosts, allPosts, deletePost } = require("../controller/posts");

router.put("/create", createPosts);

router.get("/posts", allPosts);

router.delete("/delete", auth, deletePost);

module.exports = router;
