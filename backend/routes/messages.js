import { Router } from "express";
import { requireJwtAuth } from "../middleware/jwtAuth.js";
import {
  deleteMessages,
  getRoomMessages,
} from "../controllers/messageController.js";

const messageRouter = Router();

// GET all messages for room
messageRouter.get("/get-messages/:roomName", requireJwtAuth, getRoomMessages);

// DELETE all messages for given room
messageRouter.delete(
  "/delete-messages/:roomName",
  requireJwtAuth,
  deleteMessages
);

export default messageRouter;
