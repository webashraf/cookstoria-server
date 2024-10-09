import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const signupUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createNewUserIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});
const updateUserInfo: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await userServices.updateUserIntoDb(userId, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User info updated successfully",
    data: result,
  });
});
const updateUserProfileInfo: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await userServices.updateUserProfileIntoDb(userId, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User info updated successfully",
    data: result,
  });
});

export const userController = {
  signupUser,
  updateUserInfo,
  updateUserProfileInfo,
};
