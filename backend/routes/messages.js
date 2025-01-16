import { Router } from "express";
import { requireJwtAuth } from "../middleware/jwtAuth.js";
import { getRoomMessages } from "../controllers/messageController.js";

const messageRouter = Router();

// GET all messages for room
messageRouter.get("/get-messages/:roomName", requireJwtAuth, getRoomMessages);

export default messageRouter;
