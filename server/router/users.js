const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createUser,
  loginUser,

  allUsers,
  findUser,
  deleteUser,
} = require("../controller/users");

router.put("/create", createUser);

router.post("/login", loginUser);

router.get("/users", protect, allUsers);

router.get("/finduser", protect, findUser);

router.delete("/delete/:id", protect, deleteUser);

module.exports = router;
