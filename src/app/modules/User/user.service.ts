import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.isUserExistByEmail(payload.email);

  if (isUserExist) {
    throw new Error("User already exist !");
  }

  const result = await User.create(payload);

  return result;
};

export const userServices = {
  createNewUserIntoDB,
};
