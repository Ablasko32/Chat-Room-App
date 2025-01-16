import { checkPaswword, generatePasswordHash } from "../utils/hashing.js";
import redisClient from "../config/redis.js";
import { generateJWT, verifyJWT } from "../utils/jwtToken.js";

export const createRoom = async (req, res) => {
  // REQUIRES NAME PASSWORD EXPIRATION SETS REDIS HASH WITH KEY room:<roomName>  password
  const { name, password, expiration } = req.body;

  try {
    // IF NOT NAME OR NOT PASSWORD OR NOT EXPIRATION THROW ERROR
    if (!name || !password || !expiration)
      return res.status(400).json({
        data: null,
        error: "Name,password and expiration must be provided!",
      });

    const hashedPassword = await generatePasswordHash(password);
    if (!hashedPassword) {
      return res.status(500).json({
        data: null,
        error: "Error hashing password",
      });
    }

    // CHECK TO SEE IF ROOM NAME EXISTS
    const roomExists = await redisClient.EXISTS(`rooms:${name}`);
    if (roomExists == 1) {
      return res.status(409).json({
        data: null,
        error: "Room with that name exists",
      });
    }

    // ELSE CREATING ROOM IN REDIS DB
    await redisClient.HSET(`rooms:${name}`, ["password", hashedPassword]);
    await redisClient.EXPIRE(`rooms:${name}`, expiration);

    return res.status(200).json({ data: name, error: null });
  } catch (err) {
    return res.status(500).json({
      data: null,
      error: "Error creating room!",
    });
  }
};

export const loginRoom = async (req, res) => {
  const { password, roomName, name } = req.body;
  // console.log(password, roomName);

  try {
    if (!roomName || !password || !name)
      return res
        .status(400)
        .json({ data: null, error: "Credentials are required" });

    const hashedPassword = await redisClient.HGET(
      `rooms:${roomName}`,
      "password"
    );

    const isValid = await checkPaswword(hashedPassword, password);
    if (!isValid || !hashedPassword)
      return res.status(401).json({ data: null, error: "Bad credentials" });

    const token = generateJWT({ roomName, name });
    // console.log(token);

    return res.status(200).json({
      data: { token: token, room: roomName, name: name },
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, error: "Error logging in" });
  }
};

export const verifyToken = async (req, res) => {
  const { token, paramData } = req.body;

  // COMPARES TOKEN DATA WITH PARAMDATA AND GIVES BACK RESPONSE
  try {
    const data = verifyJWT(token);
    if (paramData.roomName === data.roomName && paramData.name === data.name) {
      return res.status(200).json({ data: { valid: true }, error: null });
    } else {
      return res.status(401).json({ data: null, error: "Token not valid" });
    }
  } catch (err) {
    res.status(401).json({ data: null, error: "Token not valid" });
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const { roomName } = req.params;
    if (!roomName)
      return res
        .status(400)
        .json({ data: null, error: "Room name must be provided!" });

    const allMessages = await redisClient.lRange(
      `rooms:${roomName}:messages`,
      0,
      -1
    );

    const sortedMessages = allMessages.sort((a, b) => {
      const dateA = new Date(a.date); // Assuming date is a string like '14:31:55'
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    // PARSES MSGES AS JSON AND CREATES BUFFERS FOR IV AND BODY
    const parsedMessages = sortedMessages.map((msg) => {
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
    console.error(err);
    return res
      .status(500)
      .json({ data: null, error: "Error fetching messages" });
  }
};
