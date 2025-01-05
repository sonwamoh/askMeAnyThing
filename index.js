const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  const userId = socket.id;
  console.log(`User connected: ${userId}`);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});