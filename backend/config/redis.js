import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect();

// REDIS ERROR HANDLING
redisClient.on("error", (err) => {
  console.error("FATAL Redis error: ", err);
});

console.log("REDIS CONNECTED..");

export default redisClient;
