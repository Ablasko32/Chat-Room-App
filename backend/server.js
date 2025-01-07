import { server, app } from "./config/socket.js";

const DEFAULT_PORT = 3000;

server.listen(DEFAULT_PORT, "0.0.0.0", () => {
  console.log("RUNNING ON PORT--->" + DEFAULT_PORT);
});
