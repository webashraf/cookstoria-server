import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);
  console.log("user", user);
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

  const isPasswordMatched = bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
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

export const AuthServices = {
  loginUser,
};
