const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TeacherSchema = require("../models/TeacherSchema");
const UserSchema = require("../models/UserSchema");
const TeacherRouter = express.Router();

TeacherRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await TeacherSchema.findOne({ email: req.body.email });
  if (user) {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await TeacherSchema.create({
    email: email,
    password: hashedPassword,
  });
  res.json("teacher created successfully");
});

TeacherRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await TeacherSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.redirect("/register");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, "Hallelujah");
  res.json({ token: token, userID: user._id });
});

TeacherRouter.get("/all", async(req,res) => {
  const teachers = await TeacherSchema.find({});
  return res.json(teachers);
});

TeacherRouter.get("/:teacherID", async(req,res) => {
  const teacher = await TeacherSchema.findById(req.params.teacherID);
  res.json(teacher);
});

TeacherRouter.get("/:teacherID/:userID", async (req,res) => {
  const teacher = await TeacherSchema.findById(req.params.teacherID);
  const user = await UserSchema.findById(req.params.userID);
  teacher.students.push(user);
  await teacher.save();
  student.teachers.push(teacher);
  await teacher.save();
});

module.exports = TeacherRouter;
