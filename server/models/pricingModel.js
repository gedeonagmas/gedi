const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  title: String,
  price: Number,
  services: [String],
  image: String,
  createdAt: { type: Number, default: Date.now() },
  visible: { type: Boolean, default: true },
});

exports.Price = mongoose.model("prices", priceSchema);
