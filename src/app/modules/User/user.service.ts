import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.isUserExistByEmail(payload.email);

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist !");
  }

  const result = await User.create(payload);

  return result;
};

const updateUserIntoDb = async (userId: string, payload: Partial<TUser>) => {
  const isUserExist = await User.isUserExistById(userId as string);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found!");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return result;
};

export const userServices = {
  createNewUserIntoDB,
  updateUserIntoDb,
};
