const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  owner: String,
  date: String,
  category: String,
  description: String,
  image: String,
  createdAt: { type: Number, default: Date.now() },
  visible: { type: Boolean, default: true },
});

exports.Blog = mongoose.model("blogs", blogSchema);
