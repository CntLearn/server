const mongoose = require("mongoose");

const InteractedUsersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  userIDs: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
});

const InteractedUsers = mongoose.model(
  "InteractedUsers",
  InteractedUsersSchema
);

module.exports = InteractedUsers;
