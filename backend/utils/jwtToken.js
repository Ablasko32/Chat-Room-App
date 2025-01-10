import jwt from "jsonwebtoken";

const SECRET = process.env.SERVER_SECRET;
const DURATION = "1h";

export function generateJWT(data) {
  return jwt.sign({ ...data }, SECRET, { expiresIn: DURATION });
}

export function verifyJWT(token) {
  return jwt.verify(token, SECRET);
}
