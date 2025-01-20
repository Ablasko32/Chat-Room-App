import { Router } from "express";
import { requireJwtAuth } from "../middleware/jwtAuth.js";
import {
  deleteMessages,
  getRoomMessages,
} from "../controllers/messageController.js";

const messageRouter = Router();

/**
 * @swagger
 * /get-messages/:roomName:
 *   get:
 *     summary: Get all messages for a room
 *     parameters:
 *       - in: path
 *         name: roomName
 *         required: true
 *         description: Name of room
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       200:
 *         description: All room messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: Array
 *                 error:
 *                   type: null
 */
messageRouter.get("/get-messages/:roomName", requireJwtAuth, getRoomMessages);

/**
 * @swagger
 * /delete-messages/:roomName:
 *   delete:
 *     summary: Delete all messages for a room
 *     parameters:
 *       - in: path
 *         name: roomName
 *         required: true
 *         description: Name of room
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authentication
 *     responses:
 *       200:
 *         description: All messages deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                 error:
 *                   type: null
 */
messageRouter.delete(
  "/delete-messages/:roomName",
  requireJwtAuth,
  deleteMessages
);

export default messageRouter;
