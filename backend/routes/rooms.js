import { Router } from "express";
import {
  createRoom,
  loginRoom,
  verifyToken,
} from "../controllers/roomsController.js";

/**
 * @module rooms - API roomsRouter
 * @description  Rooms router allows for room menagment with creating rooms,login to rooms and token validation
 */
const roomsRouter = Router();

/**
 *  @member rooms
 *  @name POST /create-room
 *  @function
 *  @description Creates room with name, password and expiration time
 *  @param {string} roomName - Body param to be provided, name of the room
 *  @param {string} password - Body param to be provided, password of the room
 *  @param {string} expiration - Body param to be provided, expiration of the room
 *  @returns {Object} 201 -Object containing name of room created and error as null
 *  @example 201 - { data: name, error: null }
 */
// requires roomName,password,expiration
roomsRouter.post("/create-room", createRoom);

/**
 *
 *  @member rooms
 *  @name POST /room-login
 *  @function
 *  @description Logins to room with roomName and password
 *  @param {string} roomName - Body param to be provided, name of the room
 *  @param {string} password - Body param to be provided, password of the room
 *  @returns {Object} 200 -Object containing JWT token, name and roomName
 *  @example 200 - {
      data: { token: token, room: roomName, name: name },
      error: null,
    }
 */
roomsRouter.post("/room-login", loginRoom);
/**
 *  @member rooms
 *  @name POST /verify-jwt
 *  @function
 *  @description Verifies JWT token
 *  @param {string} token - Body param to be provided, JWT token
 *  @param {string} paramData - Body param to be provided, roomName and user name from url
 *  @returns {Object} 200 -Object containing if JWT token is valid
 *  @example 200 - { data: { valid: true }, error: null }
 */
roomsRouter.post("/verify-jwt", verifyToken);

export default roomsRouter;
