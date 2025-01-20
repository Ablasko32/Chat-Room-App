import { Router } from "express";
import {
  createRoom,
  loginRoom,
  verifyToken,
} from "../controllers/roomsController.js";

const roomsRouter = Router();

/**
 * @swagger
 * /create-room:
 *   post:
 *     summary: Create a new room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               expiration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 error:
 *                   type: null
 */
roomsRouter.post("/create-room", createRoom);

/**
 * @swagger
 * /room-login:
 *   post:
 *     summary: Login to a room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     room:
 *                       type: string
 *                     name:
 *                       type: string
 *                 error:
 *                   type: null
 */
roomsRouter.post("/room-login", loginRoom);

/**
 * @swagger
 * /verify-jwt:
 *   post:
 *     summary: Verify JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               paramData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successful verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     valid:
 *                       type: boolean
 *                     message:
 *                       type: string
 *                 error:
 *                   type: string
 *
 */

roomsRouter.post("/verify-jwt", verifyToken);

export default roomsRouter;
