import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();

// REDIS ERROR HANDLING
redisClient.on("error", (err) => {
  console.error("FATAL Redis error: ", err.message);
  throw new Error(err);
});

redisClient.on("connect", () => {
  console.log("REDIS CONNECTED..");
});

export default redisClient;
