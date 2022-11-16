const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { createChat, userChats, findChat } = require("../controller/chats");

router.post("/", protect, createChat);
router.get("/:userId", protect, userChats);
router.get("/find/:firstId/:secondId", protect, findChat);

module.exports = router;
