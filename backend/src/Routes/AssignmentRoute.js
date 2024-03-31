const express = require("express");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");
const TeacherSchema = require("../models/TeacherSchema");
const AssignmentSchema = require("../models/AssignmentSchema");
const AssignmentRouter = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "Hallelujah", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    alert("Login First");
    res.sendStatus(401);
  }
};

AssignmentRouter.get("/all/:userID", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userID);
    res.json(user.assignmentsID);
  } catch (error) {
    res.json(error);
  }
});

AssignmentRouter.get("/:assignmentID", async (req, res) => {
  try {
    const assignment = await AssignmentSchema.findById(req.params.assignmentID);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ assignment: assignment });
  } catch (error) {
    res.json(error);
  }
});

AssignmentRouter.get("/teacher/:teacherID", async (req, res) => {
  try {
    const teacher = await TeacherSchema.findById(req.params.teacherID);
    res.json(teacher.assignmentsID);
  } catch (error) {
    res.json(error);
  }
});

AssignmentRouter.post("/:teacherID", async (req, res) => {
  try {
    const teacher = await TeacherSchema.findById(req.params.teacherID);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const newAssignment = await AssignmentSchema.create({
      assignmentUrl: req.body.assignmentUrl,
      studentArray: req.body.studentArray,
      deadLine: req.body.deadLine,
      userOwner: req.params.teacherID,
    });
    assignmentID = newAssignment._id;
    teacher.assignmentsID.push(assignmentID.toString());
    await teacher.save();

    studentArray = req.body.studentArray;
    for (const studentID of studentArray) {
      const student = await UserSchema.findById(studentID);
      if (!student) {
        continue;
      }
      student.assignmentsID.push(assignmentID);
      await student.save();
    }
    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    res.json(error);
  }
});

AssignmentRouter.get("/students/:assignmentID", async (req, res) => {
  try {
    const assignment = await AssignmentSchema.findById(req.params.assignmentID);
    res.json(assignment.studentArray);
  } catch (error) {
    res.json(error);
  }
});

module.exports = AssignmentRouter;
