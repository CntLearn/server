const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware");
const { users } = require("../controllers");

// user validators
const { register, login } = require('../validators/user');

router
  .route("/")
  .post(register, users.registerUser)
  .get(Auth, users.getAllUsers);

router
  .route("/login")
  .post(login, users.loginUser);

router
  .route("/:id")
  .get(Auth, users.getUserById)
  .put(Auth, users.updateUserById)
  .delete(Auth, users.deleteUserById);



// router
//   .route("/:id")
//   .delete(userController.deleteUserById);

module.exports = router;
