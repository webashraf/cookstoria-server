/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../error/appError";
import handleCastError from "../error/handleCastError";
import handleMongoseValidationError from "../error/handleMongoseValidationError";
import handleZodError from "../error/handleZodError";
import { TErrorSource } from "../interface/error";

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  let statusCode = err.statusCode || 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === "ValidationError") {
    statusCode = handleMongoseValidationError(err).statusCode;
    message = handleMongoseValidationError(err).message;
    errorSources = handleMongoseValidationError(err).errorSources;
  } else if (err.name === "CastError") {
    statusCode = handleCastError(err).statusCode;
    message = handleCastError(err).message;
    errorSources = handleCastError(err).errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "socialConductivity",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource: errorSources,
    // err: err.name,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandlerMiddleware;
