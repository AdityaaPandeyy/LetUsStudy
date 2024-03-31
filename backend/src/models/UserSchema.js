const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const AssignmentSchema = require("./AssignmentSchema");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignmentsID: [{ type: String }],
  teachers: [{ type: String }],
});

module.exports = mongoose.model("user", UserSchema);
