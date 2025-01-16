// CUSTOM ERROR HANDLING MIDDLEWARE DEFAULTS TO 500, Internal server error
export default function errorHandler(err, req, res, next) {
  console.error("ERROR HANDLER: ", err);
  const errMessage = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({ data: null, error: errMessage });
}

// CUSTOM SERVER ERROR CLASS INSTEAD OF MESSAGE ACCEPTS BOTH MESSAGE AND STATUS CODE
export class ServerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
