const express = require("express");
const router = express.Router();

const userRoute = require("./User");
const interactedUserRoute = require("./InteractedUsers");
const chatsRoute = require("./Chats");
const todosRoute = require("./Todos");

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/interactedUser",
    route: interactedUserRoute,
  },
  {
    path: "/chats",
    route: chatsRoute,
  },
  {
    path: "/todos",
    route: todosRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
