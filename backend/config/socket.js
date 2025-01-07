import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("user connected,sockedID", socket.id);

  // kada user emitira join room server ga priruzi sobi s imenom
  socket.on("joinedRoom", ({ name, room }) => {
    socket.join(room);
    console.log(name + " joined room: " + room);
    io.to(room).emit("userJoined", `User ${name} has joined`);
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push({ name, socketId: socket.id });
    // console.log("ROOMS ON JOIN", rooms);
  });

  // Send messages to room
  socket.on("newMessage", (message) => {
    console.log(message);
    const senderMessage = {
      sender: message.name,
      body: message.text,
      date: new Date().toLocaleTimeString(),
    };
    io.to(message.room).emit("getNewMessage", senderMessage);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected, socketID:", socket.id);

    // Iterate through each room to find the user
    for (const room in rooms) {
      // console.log(room);
      // console.log(rooms[room]);
      const index = rooms[room].findIndex(
        (user) => user.socketId === socket.id
      );
      console.log(index);
      if (index !== -1) {
        const removed = rooms[room].splice(index, 1);
        // console.log("REMOVED", removed);
        // console.log("ROOMS AFTER DISCONECT", rooms);
        if (removed.length !== 0) {
          io.to(room).emit("userLeft", `User ${removed[0].name} has left room`);
        }
      }
      break;
    }
  });
});

export { io, server, app };
