import httpStatus from "http-status";
import AppError from "../../../error/appError";
import { User } from "../../user/user.model";
import { ISociety } from "./society.interface";
import { Society } from "./society.model";

const createSocietyIntoDB = async (payload: ISociety) => {
  const isUserExist = await User.isUserExistById(payload?.admin);

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!");
  }

  const result = await Society.create(payload);
  return result;
};

const getSocietyFromDB = async () => await Society.find();

export const societyServices = {
  createSocietyIntoDB,
  getSocietyFromDB,
};
