const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const TeacherSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students : [{type : String}],
  assignmentsID : [{type : String}]
});

module.exports = mongoose.model("teacher", TeacherSchema);