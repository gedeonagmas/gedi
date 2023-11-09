const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  groupName: { type: String },
  flag: { type: String },
  ownersName: { type: String },
  ownersId: { type: String },
  groupPro: { type: [Object] },
  members: { type: [String] },
  requests: { type: [String] },
  type: { type: String, default: "public" },
  role: { type: String },
});

module.exports.groupModel = mongoose.model("groups", groupSchema);
