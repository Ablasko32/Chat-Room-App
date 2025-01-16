import { checkPaswword, generatePasswordHash } from "../utils/hashing.js";
import redisClient from "../config/redis.js";
import { generateJWT, verifyJWT } from "../utils/jwtToken.js";
import { ServerError } from "../middleware/errorHandler.js";

export const createRoom = async (req, res, next) => {
  // REQUIRES NAME PASSWORD EXPIRATION SETS REDIS HASH WITH KEY room:<roomName>  password
  const { name, password, expiration } = req.body;

  try {
    // IF NOT NAME OR NOT PASSWORD OR NOT EXPIRATION THROW ERROR
    if (!name || !password || !expiration) {
      throw new ServerError(
        "Name,password and expiration must be provided!",
        400
      );
    }

    const hashedPassword = await generatePasswordHash(password);
    if (!hashedPassword) {
      throw new ServerError("Error hashing password");
    }

    // CHECK TO SEE IF ROOM NAME EXISTS
    const roomExists = await redisClient.EXISTS(`rooms:${name}`);
    if (roomExists == 1) {
      throw new ServerError("Room with that name already exists", 409);
    }

    // ELSE CREATING ROOM IN REDIS DB
    await redisClient.HSET(`rooms:${name}`, ["password", hashedPassword]);
    await redisClient.EXPIRE(`rooms:${name}`, expiration);

    return res.status(200).json({ data: name, error: null });
  } catch (err) {
    next(err);
  }
};

export const loginRoom = async (req, res, next) => {
  const { password, roomName, name } = req.body;
  // console.log(password, roomName);

  try {
    if (!roomName || !password || !name) {
      throw new ServerError("Credentials are required", 400);
    }

    const hashedPassword = await redisClient.HGET(
      `rooms:${roomName}`,
      "password"
    );
    if (!hashedPassword) {
      throw new ServerError("Invalid credentials", 401);
    }

    const isValid = await checkPaswword(hashedPassword, password);
    if (!isValid || !hashedPassword) {
      throw new ServerError("Invalid credentials", 401);
    }

    const token = generateJWT({ roomName, name });
    // console.log(token);

    return res.status(200).json({
      data: { token: token, room: roomName, name: name },
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyToken = async (req, res, next) => {
  const { token, paramData } = req.body;

  // COMPARES TOKEN DATA WITH PARAMDATA AND GIVES BACK RESPONSE
  try {
    const data = verifyJWT(token);
    if (paramData.roomName === data.roomName && paramData.name === data.name) {
      return res.status(200).json({ data: { valid: true }, error: null });
    } else {
      throw new ServerError("Token not valid", 401);
    }
  } catch (err) {
    next(err);
  }
};
