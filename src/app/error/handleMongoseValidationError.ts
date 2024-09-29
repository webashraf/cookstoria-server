import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleMongoseValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  
  const errorSources: TErrorSource = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation error!!",
    errorSources,
  };
};

export default handleMongoseValidationError;
