const mongoose = require("mongoose");
const ChatsShema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    defaultValue: "",
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  participants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  avatar: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  lastMessage: {
    type: String,
    default: "",
  },

  // createdBy and updatedBy can be type objectIds

  createdBy: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    default: "",
  },
  admins: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  bans: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    default: [],
  },
  messages: {
    type: [
      {
        text: {
          type: String,
          default: "",
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        deletedBy: {
          type: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
});

const Chats = mongoose.model("Chats", ChatsShema);

module.exports = Chats;
