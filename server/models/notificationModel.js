const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  receiver: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
  date: { type: Number, default: Date.now() },
  description: String,
});

exports.Notification = mongoose.model("notifications", notificationSchema);
