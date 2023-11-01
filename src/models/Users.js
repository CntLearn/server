const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    default: ''
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
  lastMessage: {
    type: String,
    default: '',
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
