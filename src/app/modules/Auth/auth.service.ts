/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
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
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked!!");
  }

  if (!(await isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Don't match password!!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
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
  userData: any,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistByEmail(userData?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  if (!(await isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Don't match password!!");
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const genarateNewPassword = async (payload: {
  email: string;
  newPassword: string;
}) => {
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
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

export const authServices = {
  loginUser,
  changePasswordIntoDB,
  generateNewPassword: genarateNewPassword,
};
