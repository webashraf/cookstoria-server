/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, isPasswordMatched } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is deleted!");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked!!");
  }

  if (!(await isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Don't match password!!");
  }

  const jwtPayload = {
    name: user.username,
    email: user.email,
    role: user.role,
    id: user._id,
    photo: user.profilePicture,
    isPremium: user.isPremium,
    paymentStatus: user.paymentStatus,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userId: any,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user is blocked ! !");
  }

  if (!(await isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Don't match password!!");
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );
  await User.findByIdAndUpdate(userId, {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  });

  return null;
};

const generateNewPassword = async (payload: {
  email: string;
  newPassword: string;
}) => {
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user is blocked ! !");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  await User.findOneAndUpdate(
    {
      email: payload.email,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshTokenToAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  return {
    accessToken,
  };
};

const getAllUsersFromDB = async () => {
  const user = await User.find({
    role: "user",
  });
  const premiumUser = await User.find({ role: "user", isPremium: true });

  return { user, premiumUser: premiumUser.length, dataLength: user.length };
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const getAllAdminFromDB = async () => {
  const res = await User.find({ role: "admin" });
  return res;
};

export const authServices = {
  getAllUsersFromDB,
  getAllAdminFromDB,
  getSingleUserFromDB,
  loginUser,
  changePasswordIntoDB,
  generateNewPassword: generateNewPassword,
  refreshTokenToAccessToken,
};
