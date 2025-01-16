import { verifyJWT } from "../utils/jwtToken.js";

// VERIFIES AUTHORIZATION HEADER OF INCOMING REQUEST FOR VALID TOKEN OR THROWS 401
export function requireJwtAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (verifyJWT(token)) next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ data: null, error: "Invalid token" });
  }
}

// MIDDLEWARE CHECKS INCOMING SOCKET CONNECTION FOR JWT TOKEN OR THROWS ERR
export const requireSocketJwt = (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const data = verifyJWT(token);
    // console.log("TOKENDATA", data);
    socket.userName = data.name;
    socket.room = data.roomName;
    next();
  } catch (err) {
    console.error("TOKEN ERR:", err.message);
    next(new Error("Error TOKEN"));
  }
};
