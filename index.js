const http = require("http");
const socketio = require("socket.io");
const { port } = require("./src/config");
const app = require("./src/app");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {},
});
require("./src/utils/db");

io.on("connection", (socket) => {
  console.log("New client is connected.");

  // emitting message to client on event.
  // socket.emit("sendMessage", {
  //   id: socket.id,
  //   message: "Message from server",
  // });
  // emitting messages to client

  //Listens and logs the message to the console from client
  socket.on("sendMessage", (message) => {
    console.log("message : ", message);
    socket.emit("sendMessage", `message from server + ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("A connection is left");
  });
});

server.listen(port, () => {
  console.log("server is listening on port : ", port);
});
