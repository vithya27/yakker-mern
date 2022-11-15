const express = require("express");
const router = express.Router();


const {
  createComment,
  getComments,
  deleteComment,
} = require("../controller/comments");

router.put("/create", createComment);

router.get("/:id", getComments);

router.delete("/:id", deleteComment);

module.exports = router;
