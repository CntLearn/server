const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware");
const { chats } = require("../controllers");

// pre route /chats
router
  .route("/")
  .post(Auth, chats.createChat)
  .get(Auth, chats.fetchChatAndGroups);

router
  .route("/:chatId")
  .post(Auth, chats.sendMessage)
  .put(Auth, chats.deleteMessage);

router.route("/:userId/:type").get(Auth, chats.fetchInteraction);

// router
//   .route("/:id")
//   .get(Auth, users.getUserById)
//   .patch(Auth, users.updateUserById)
//   .delete(Auth, users.deleteUserById);

// router.route("/login").post(users.loginUser);

// router
//   .route("/:id")
//   .delete(userController.deleteUserById);

module.exports = router;
