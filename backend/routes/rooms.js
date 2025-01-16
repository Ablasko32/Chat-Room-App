import { Router } from "express";
import {
  createRoom,
  getRoomMessages,
  loginRoom,
  verifyToken,
} from "../controllers/roomsController.js";
import { requireJwtAuth } from "../middleware/jwtAuth.js";

const roomsRouter = Router();

// requires roomName,password,expiration
roomsRouter.post("/create-room", createRoom);

// requires roomName,password returns JWT token if verified
roomsRouter.post("/room-login", loginRoom);

// VERIFY JWT token
roomsRouter.post("/verify-jwt", verifyToken);

// GET all messages for room
roomsRouter.get("/get-messages/:roomName", requireJwtAuth, getRoomMessages);

export default roomsRouter;
