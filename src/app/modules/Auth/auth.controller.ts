import jwt from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const userPasswordChange = catchAsync(async (req, res) => {
  const userData = jwt.verify(
    req.headers.authorization as string,
    config.jwt_access_secret as string
  );

  const result = await authServices.changePasswordIntoDB(userData, req.body);

  res.status(200).json({
    success: true,
    message: "Password is updated successfully!",
    data: result,
  });
});

const forgatPassword = catchAsync(async (req, res) => {
  // const userData = jwt.verify(
  //   req.headers.authorization as string,
  //   config.jwt_access_secret as string
  // );

  // console.log(req.body, "generating password");

  const result = await authServices.generateNewPassword(req.body);

  res.status(200).json({
    success: true,
    message: "Password is updated successfully!",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshTokenToAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    message: "Access token retrieved successfully!",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await authServices.getAllUsersFromDB();

  res.status(200).json({
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

export const authControllers = {
  getAllUsers,
  loginUser,
  userPasswordChange,
  forgatPassword,
  refreshToken,
};
