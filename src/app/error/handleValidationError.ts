import mongoose from "mongoose";
import { TErrorMessage, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: TErrorMessage = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  return {
    statusCode,
    message: "Validation error!!",
    errorMessages,
  };
};

export default handleValidationError;
