import express from "express";
import https from "https";
import { Server } from "socket.io";
import redisClient from "./redis.js";
import fs from "fs";
import { requireSocketJwt } from "../middleware/jwtAuth.js";

// Read SSL certificate files
const PRIVATE_KEY = fs.readFileSync("key.pem", "utf8");
const CERTIFICATE = fs.readFileSync("cert.pem", "utf8");

// EXPRESS APP
const app = express();

// Create an HTTPS service using the SSL certificates
const server = https.createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, app);

// IO SERVER WITH CORS
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

// MIDDLEWARE CHECKS INCOMING CONNECTION FOR JWT TOKEN OR THROWS ERR
io.use(requireSocketJwt);

io.on("connection", (socket) => {
  // console.log("user connected,sockedID", socket.id);

  socket.on("connect_error", (error) => {
    console.error("Connection failed:", error);
  });

  socket.on("error", (exception) => {
    console.error("SOCKET ERR", exception);
  });

  // WHEN USER EMITS joinedRoom SERVER JOINS HIM TO ROOM NAME VIA DATA FROM JWT TOKEN THATS PART OF SOCKET

  socket.on("joinedRoom", async () => {
    const name = socket.userName;
    const room = socket.room;
    socket.join(room);

    try {
      // SET USER NAME ID PAIR IN REDIS HASH
      await redisClient.hSet(`rooms:${room}:users`, name, socket.id);

      // EMIT NOTIFICATION TO ROOM THAT NEW USER HAS JOINED
      io.to(room).emit("userJoined", `User ${name} has joined`);
    } catch (err) {
      console.error("Error joining room:", err);

      socket.disconnect(true);
    }
  });

  // WHEN MESSAGE IS SENT IT IS EMITED TO ROOM VIA getNewMessage
  socket.on("newMessage", async (message) => {
    const senderMessage = {
      sender: message.name,
      iv: message.iv,
      body: message.text,
      date: new Date().toLocaleTimeString(),
    };
    // console.log("SENDER MSG", senderMessage);

    // PUSH MESSAGE TO REDIS LIST IN KEY rooms:<roomName>:messages
    try {
      // FIND OUT REMAINING TTL OF ROOM
      const roomTTL = await redisClient.ttl(`rooms:${socket.room}`);
      // console.log(roomTTL);

      await redisClient.LPUSH(
        `rooms:${socket.room}:messages`,
        JSON.stringify(senderMessage)
      );

      // SET ROOM TTL TO MESSAGES
      await redisClient.expire(`rooms:${socket.room}:messages`, roomTTL);

      // console.log("SERVER", senderMessage);
      io.to(message.room).emit("getNewMessage", senderMessage);
    } catch (err) {
      console.error(err);
      socket.disconnect(true);
    }
  });

  // ON DISCONNECT
  socket.on("disconnect", async () => {
    const room = socket.room;

    try {
      // REMOVE USER FROM REDIS HASH
      await redisClient.hDel(`rooms:${room}:users`, socket.userName);
    } catch (err) {
      console.error("Error removing user from Redis:", err);
    }

    io.emit("userLeft", `User ${socket.userName} has left`);
  });
});

export { io, server, app };
