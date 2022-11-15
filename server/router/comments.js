const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controller/comments");

router.put("/create", protect, createComment);

router.get("/:id", protect, getComments);

router.delete("/:id", protect, deleteComment);

module.exports = router;
