const mongoose = require("mongoose");
const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }); //replace by MONGO_URL
  console.log("gym database connected successfully");
};

module.exports = mongodb;
