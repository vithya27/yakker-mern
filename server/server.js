require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/db");
const users = require("./router/users");
const posts = require("./router/posts");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/users", users);
app.use("/posts", posts);

const PORT = process.env.PORT || 5001;
app.listen(PORT);
