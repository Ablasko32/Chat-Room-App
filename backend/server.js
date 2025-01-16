import "./config/conifg.js";
import { json } from "express";
import { server, app } from "./config/socket.js";
import roomsRouter from "./routes/rooms.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import messageRouter from "./routes/messages.js";

const DEFAULT_PORT = 3000;

app.use(json());
app.use(cors());

// ROUTES
app.use(roomsRouter);
app.use(messageRouter);

// CUSTOM ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

server.listen(DEFAULT_PORT, "0.0.0.0", () => {
  console.log("RUNNING ON PORT--->" + DEFAULT_PORT);
});
