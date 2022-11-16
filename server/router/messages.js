const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { addMessage, getMessages } = require("../controller/messages");

router.post("/", protect, addMessage);
router.get("/:chatId", protect, getMessages);

module.exports = router;
