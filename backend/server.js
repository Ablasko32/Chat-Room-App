import "./config/conifg.js";
import { json } from "express";
import { server, app } from "./config/socket.js";
import roomsRouter from "./routes/rooms.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import messageRouter from "./routes/messages.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config/swagger.js";

const DEFAULT_PORT = 3000;

app.use(json());
app.use(cors());

// ROUTES
app.use(roomsRouter);
app.use(messageRouter);

// SWAGGER DOCS /api-docs
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// CUSTOM ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

server.listen(DEFAULT_PORT, () => {
  console.log("RUNNING ON PORT--->" + DEFAULT_PORT);
});
