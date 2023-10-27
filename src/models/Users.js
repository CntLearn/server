const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  lastSeen: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: "",
  },
  plainPassword: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
