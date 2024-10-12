import httpStatus from "http-status";
import AppError from "../error/appError";
import catchAsync from "../utils/catchAsync";

export const parseBody = catchAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(httpStatus.BAD_REQUEST, "Data not found!!");
  }
  req.body = JSON.parse(req.body.data);

  next();
});
