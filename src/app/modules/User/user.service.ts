import bcrypt from "bcrypt";
import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserIntoDB = async (payload: TUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt)
  );

  const result = await User.create(payload);

  result.password = "";
  return result;
};

export const UserServices = {
  createNewUserIntoDB,
};
