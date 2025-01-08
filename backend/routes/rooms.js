import { Router } from "express";
import {
  createRoom,
  loginRoom,
  verifyToken,
} from "../controllers/roomsController.js";

const roomsRouter = Router();

// requires roomName,password,expiration
roomsRouter.post("/create-room", createRoom);

// requires roomName,password returns JWT token if verified
roomsRouter.post("/room-login", loginRoom);

// VERIFY JWT token
roomsRouter.post("/verify-jwt", verifyToken);

export default roomsRouter;
