import redisClient from "../config/redis.js";
import { ServerError } from "../middleware/errorHandler.js";
import { io } from "../config/socket.js";

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

    // PARSES MSGES AS JSON
    const parsedMessages = allMessages.map((msg) => {
      const parsedMsg = JSON.parse(msg);
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

export const deleteMessages = async (req, res, next) => {
  try {
    // target room
    const { roomName } = req.params;

    // delete messages from redis
    await redisClient.del(`rooms:${roomName}:messages`);
    // emits event that needs to be handled by refetching data so it stays in sync
    io.to(roomName).emit("killSwitch", "Kill switch activated");
    return res.status(200).json({ data: "Room messages deleted", error: null });
  } catch (err) {
    next(err);
  }
};
