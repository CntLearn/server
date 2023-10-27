const { Users } = require("../models");

const registerUser = (user) => {
  return Users.create(user);
};

const findByUsername = (email) => {
  return Users.find({ email });
};

const getAllUsers = () => {
  return Users.find({ isDeleted: false });
};

const getUserById = async (userId) => {
  return Users.findOne({ _id: userId });
};

const updateUserById = async (userId, user) => {
  return Users.updateOne({ _id: userId }, user);
};

// it will be soft deleted, update isDeleted to true.

const deleteUserById = async (userId) => {
  return Users.updateOne({ _id: userId }, { isDeleted: true });
};

module.exports = {
  registerUser,
  findByUsername,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
