const mongoose = require("mongoose");

const chatsModel = mongoose.Schema(
  {
    chatOwners: {
      type: String,
    },
    chatId: {
      type: String,
    },
    messages: {
      type: [Object],
    },
    chatType: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports.chats = mongoose.model("chats", chatsModel);
