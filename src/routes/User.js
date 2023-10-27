const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware");
const { users } = require("../controllers");

router.route("/")
  .post(users.registerUser)
  .get(Auth, users.getAllUsers);

router
  .route("/:id")
  .get(Auth, users.getUserById)
  .patch(Auth, users.updateUserById)
  .delete(Auth, users.deleteUserById);

router.route("/login").post(users.loginUser);

// router
//   .route("/:id")
//   .delete(userController.deleteUserById);

module.exports = router;
