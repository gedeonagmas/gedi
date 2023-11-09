const mongoose = require("mongoose");
const mongodb = async () => {
  await mongoose.connect("mongodb+srv://user:8ZqlavmPvnYWgn91@cluster0.rhayeki.mongodb.net/GYM?retryWrites=true&w=majority", { useNewUrlParser: true }); //replace by MONGO_URL
  console.log("gym database connected successfully");
};

module.exports = mongodb;
