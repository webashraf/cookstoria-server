import { TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const errorMessages = [
    {
      path: "",
      message: `${match && match[1]} is already exist`,
    },
  ];

  return {
    statusCode,
    message: "Validation error!!",
    errorMessages,
  };
};

export default handleDuplicateError;
