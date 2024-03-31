const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AssignmentSchema = new Schema({
  assignmentUrl: { type: String },
  studentArray: [{ type: String }],
  deadLine: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("assignment", AssignmentSchema);
