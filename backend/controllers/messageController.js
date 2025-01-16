import redisClient from "../config/redis.js";
import { ServerError } from "../middleware/errorHandler.js";

export const getRoomMessages = async (req, res, next) => {
  try {
    const { roomName } = req.params;
    if (!roomName) {
      throw new ServerError("Room name must be provided!", 400);
    }

    const allMessages = await redisClient.lRange(
      `rooms:${roomName}:messages`,
      0,
      -1
    );

    // PARSES MSGES AS JSON AND CREATES BUFFERS FOR IV AND BODY
    const parsedMessages = allMessages.map((msg) => {
      const parsedMsg = JSON.parse(msg);
      parsedMsg.body = Buffer.from(parsedMsg.body);
      parsedMsg.iv = Buffer.from(parsedMsg.iv);
      // console.log("PARSED MSG", parsedMsg);
      return parsedMsg;
    });

    return res.status(200).json({
      data: parsedMessages,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
