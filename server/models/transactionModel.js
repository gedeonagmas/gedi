const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  phone: String,
  city: String,
  profilePicture: String,
  class: String,
  date: { type: Number, default: Date.now() },
  price: Number,
  method: String,
  status: String,
});

exports.Transaction = mongoose.model("transactions", transactionSchema);
