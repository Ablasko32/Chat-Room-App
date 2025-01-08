import "./config/conifg.js";
import { json } from "express";
import { server, app } from "./config/socket.js";
import roomsRouter from "./routes/rooms.js";
import cors from "cors";

const DEFAULT_PORT = 3000;

app.use(json());
app.use(cors());

// ROUTES
app.use(roomsRouter);

server.listen(DEFAULT_PORT, "0.0.0.0", () => {
  console.log("RUNNING ON PORT--->" + DEFAULT_PORT);
});
