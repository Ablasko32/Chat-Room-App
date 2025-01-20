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
 *     tags:
 *      - Rooms
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
 *                 default: 3600
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
 *                   default: null
 */
roomsRouter.post("/create-room", createRoom);

/**
 * @swagger
 * /room-login:
 *   post:
 *     summary: Login to a room
 *     tags:
 *      - Rooms
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
 *                   default: null
 */
roomsRouter.post("/room-login", loginRoom);

/**
 * @swagger
 * /verify-jwt:
 *   post:
 *     summary: Verify JWT token
 *     tags:
 *      - Rooms
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
 *                 properties:
 *                   room:
 *                    type: string
 *                   name:
 *                    type: string
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
 *                   default: null
 *
 */

roomsRouter.post("/verify-jwt", verifyToken);

export default roomsRouter;
