const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/UserSchema");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserSchema.findOne({ email: req.body.email });
  if (user) {
    return res.json({ message: "User Already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserSchema.create({
    email: email,
    password: hashedPassword,
  });
  res.json({ message: "User Created Successfully" });
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ message: "User Doesn't Exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, "Hallelujah");
  res.json({ token: token, userID: user._id });
});

UserRouter.get("/all", async (req, res) => {
  const users = await UserSchema.find({});
  res.json(users);
});

UserRouter.get("/:studentID", async (req, res) => {
  const user = await UserSchema.findById(req.params.studentID);
  res.json(user);
});

module.exports = UserRouter;
