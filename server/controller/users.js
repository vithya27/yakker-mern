const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      throw Error("All fields must be filled.");
    }
    if (!validator.isEmail(req.body.email)) {
      throw Error("Email is not valid.");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      throw Error("Password is not strong enough.");
    }

    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "An account with this email already exists.",
      });
    }

    const userName = await Users.findOne({ username: req.body.username });
    if (userName) {
      return res.status(400).json({
        status: "error",
        message: "An account with this username already exists.",
      });
    }

    // salt is a random string of characters that is added to the users password before the hash.
    // if 2 ppl use the same password, hackers cannot use password matching because hashes for identical passwords will be different
    // higher the genSalt number, the longer it will take for person to sign up.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const createdUser = await Users.create({
      email: req.body.email,
      username: req.body.username,
      hash,
    });
    res.json({ status: "okay", message: "user created" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "This email is not registered" });
    }

    const result = await bcrypt.compare(req.body.password, user.hash);
    if (!result) {
      return res
        .status(401)
        .json({ status: "error", message: "Login failed." });
    }
    const payload = {
      id: user._id,
      username: user.username,
      profilePic: user.profilePic,
      role: user.role,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    const response = {
      access,
    };

    res.status(200).json({ payload, response });
  } catch (err) {
    res.status(401).json({ status: "error", message: "login failed" });
  }
};

const allUsers = async (req, res) => {
  let users = "";

  if (req.user.role === "admin") {
    users = await Users.find();
  }
  res.json(users);
};

const findUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "user not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const findUserbyId = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "user not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role === "admin") await Users.findByIdAndDelete(req.params.id);
    res.json({ status: "okay", message: "user deleted" });
  } catch (err) {
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const updateUser = async (req, res) => {
  const response = await Users.findByIdAndUpdate(
    req.params.id,
    {
      profilePic: req.body.profilePic,
    },
    { new: true }
  );
  res.json({ status: "ok", message: "updated" });
};
module.exports = {
  createUser,
  loginUser,
  allUsers,
  findUser,
  findUserbyId,
  deleteUser,
  updateUser,
};
