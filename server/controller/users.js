const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(req.body.email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(req.body.password)) {
      throw Error("Password is not strong enough.");
    }

    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "duplicate email" });
    }

    // salt is a random string of characters that is added to the users password before the hash.
    // if 2 ppl use the same password, hackers cannot use password matching because hashes for identical passwords will be different
    // higher the genSalt number, the longer it will take for person to sign up.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const createdUser = await Users.create({
      email: req.body.email,
      hash,
    });
    console.log("created user is: ", createdUser);
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
        .json({ status: "error", message: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, user.hash);
    if (!result) {
      console.log("Username or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }
    const payload = {
      id: user._id,
      email: user.email,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    const response = {
      access,
      refresh,
    };

    res.status(200).json({ payload, response });
  } catch (err) {
    res.status(401).json({ status: "error", message: "login failed" });
  }
};

const refreshUser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      email: decoded.email,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const response = {
      access,
    };

    res.json(response);
  } catch (err) {
    console.log("POST/users/refresh", err);
    res.status(401).json({
      status: "error",
      message: "unauthorised",
    });
  }
};

const allUsers = async (req, res) => {
  // let users = "";

  // if(req.decoded.role === "admin") {
  //   users = await Users.find();
  // } else {
  //   users = await Users.findOne({email:req.decoded.email})
  // }
  const users = await Users.find();
  res.json(users);
};

const findUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).select("email");
    if (!user) {
      console.log("user not found");
      return res
        .status(400)
        .json({ status: "error", message: "user not found" });
    }
    res.json(user);
  } catch (err) {
    console.log("POST/users/user", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ email: req.body.email });
    res.json({ status: "okay", message: "user deleted" });
  } catch (err) {
    console.log("DELETE/ users/ delete", err);
    // keep error messages generic. front-end should not know. may be more prone to hacking if they know what the issue is.
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};
module.exports = {
  createUser,
  loginUser,
  refreshUser,
  allUsers,
  findUser,
  deleteUser,
};
