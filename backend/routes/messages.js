import { Router } from "express";
import { requireJwtAuth } from "../middleware/jwtAuth.js";
import {
  deleteMessages,
  getRoomMessages,
} from "../controllers/messageController.js";

/**
 * @module messages - API messagesRouter
 * @description Allows for getting all messages or deleting them for specified rooms
 */
const messageRouter = Router();

/**
 * @member messages
 * @name GET /get-messages/:roomName
 * @function
 * @description Get all messages for specifed room via url params, requires jwtAuth
 * @param {string} roomName - url param to be provided containing room name
 * @returns {Object} 200 - object containing list of messages in data
 * @example 200 - { data: [{sender:"name",iv:{type:"Buffer",data;[Array]},body:{type:"Buffer",data;[Array]},date:"13:07:01"},{...},{...}], error: null }
 */
messageRouter.get("/get-messages/:roomName", requireJwtAuth, getRoomMessages);

/**
 * @member messages
 * @name DELETE /delete-messages/:roomName
 * @function
 * @description Delete all messages for specifed room via url params, requires jwtAut
 * @param {string} roomName - url param to be provided containing room name
 * @returns {Object} 200 - object containing message in data that messages have been deleted
 * @example 200 - { data: "Room messages deleted", error: null }
 */
messageRouter.delete(
  "/delete-messages/:roomName",
  requireJwtAuth,
  deleteMessages
);

export default messageRouter;
