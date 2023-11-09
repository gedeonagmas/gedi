const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    title: String,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: String,
    image: String,
    difficulty: String,
    members: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
    amount: Number,
    createdAt: { type: Number, default: Date.now() },
    visible: { type: Boolean, default: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

exports.Class = mongoose.model("classes", classSchema);
