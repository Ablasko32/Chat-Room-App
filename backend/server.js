import { server } from "./config/socket.js";

const DEFAULT_PORT = 3000;

server.listen(DEFAULT_PORT, () => {
  console.log("RUNNING ON PORT--->" + DEFAULT_PORT);
});
