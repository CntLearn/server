const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware");
const { users } = require("../controllers");

// user validators
const { register, login } = require('../validators/user');

// pre routes :  /users
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

module.exports = router;
