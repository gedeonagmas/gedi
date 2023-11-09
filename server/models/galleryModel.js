const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  owner: String,
  image: String,
  size: String,
  lastModified: Number,
  visible: {
    type: Boolean,
    default: true,
  },
});

exports.Gallery = mongoose.model("galleries", gallerySchema);
