const express = require("express");
const router = express.Router();
const { Auth } = require("../middleware");
const { interactedUsers } = require("../controllers");

router.route("/").post(Auth, interactedUsers.addUser);

router.route("/:userId").get(Auth, interactedUsers.getInteractedUsers);

module.exports = router;
