import { ErrorRequestHandler } from "express";
import config from "../config";

const glovalErrorHandaler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: "Something went wrong!!",
    errorSource: err.message,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default glovalErrorHandaler;
