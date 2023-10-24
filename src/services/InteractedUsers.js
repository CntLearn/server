const { InteractedUsers } = require("../models");

const addUser = (userId, interactedId) => {
  return InteractedUsers.findOne({ userId }).then((user) => {
    if (!user) {
      return InteractedUsers.create({
        userId,
        userIDs: [interactedId],
      });
    } else {
      return InteractedUsers.findOneAndUpdate(
        { userId: userId },
        {
          $push: { userIDs: interactedId },
        },
        { new: true }
      );
    }
  });
};

const getInteractedUsers = (userId) => {
  // getting only userIDs array, this is called projectection
  return InteractedUsers.find({ userId }, { userIDs: 1 });
};

module.exports = {
  addUser,
  getInteractedUsers,
};
