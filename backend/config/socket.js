import express from "express";
import https from "https";
import { Server } from "socket.io";
import redisClient from "./redis.js";
import fs from "fs";

// Read SSL certificate files
const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("cert.pem", "utf8");

const app = express();

// Create an HTTPS service using the SSL certificates
const server = https.createServer({ key: privateKey, cert: certificate }, app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://127.0.0.1:5173",
      "https://192.168.0.17:5173",
      "https://localhost:5173",
    ], // Add all allowed origins
    methods: ["GET", "POST"], // Allowed methods
  },
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("user connected,sockedID", socket.id);

  socket.on("connect_error", (error) => {
    console.error("Connection failed:", error);
  });

  // kada user emitira join room server ga priruzi sobi s imenom
  socket.on("joinedRoom", ({ name, room }) => {
    socket.join(room);
    console.log(name + " joined room: " + room);
    io.to(room).emit("userJoined", `User ${name} has joined`);

    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push({ name, socketId: socket.id });
  });

  // Send messages to room
  socket.on("newMessage", (message) => {
    const senderMessage = {
      sender: message.name,
      iv: message.iv,
      body: message.text,
      date: new Date().toLocaleTimeString(),
    };
    console.log("SERVER", senderMessage);
    io.to(message.room).emit("getNewMessage", senderMessage);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected, socketID:", socket.id);

    // Iterate through each room to find the user
    for (const room in rooms) {
      const index = rooms[room].findIndex(
        (user) => user.socketId === socket.id
      );

      if (index !== -1) {
        const removed = rooms[room].splice(index, 1);
        if (removed.length !== 0) {
          io.to(room).emit("userLeft", `User ${removed[0].name} has left room`);
        }
      }
      break;
    }
  });
});

export { io, server, app };
