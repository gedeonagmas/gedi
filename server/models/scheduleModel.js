const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "classes" },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  startTime: String,
  finishTime: String,
  day: String,
  visible: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now() },
});

exports.Schedule = mongoose.model("schedules", scheduleSchema);
