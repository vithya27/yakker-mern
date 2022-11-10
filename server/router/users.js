const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createUser,
  loginUser,
  refreshUser,
  allUsers,
  findUser,
  deleteUser,
} = require("../controller/users");

router.put("/create", createUser);

router.post("/login", loginUser);

router.post("/refresh", refreshUser);

router.get("/users", auth, allUsers);

router.post("/users", auth, findUser);

router.delete("/users", auth, deleteUser);

module.exports = router;
