import { checkPaswword, generatePasswordHash } from "../utils/hashing.js";
import redisClient from "../config/redis.js";
import { generateJWT, verifyJWT } from "../utils/jwtToken.js";

export const createRoom = async (req, res) => {
  // REQUIRES NAME PASSWORD EXPIRATION SETS REDIS HASH WITH KEY room:<roomName> fields password and creator
  const { name, password, expiration } = req.body;

  try {
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
    // CREATING ROOM IN REDIS DB
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
  console.log(password, roomName);

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

    const token = generateJWT(roomName);
    console.log(token);

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
  const { token } = req.body;
  try {
    if (!verifyJWT(token))
      return res.status(401).json({ data: null, error: "Token not valid" });
    return res.status(200).json({ data: { valid: true }, error: null });
  } catch (err) {
    res.status(401).json({ data: null, error: "Token not valid" });
  }
};
