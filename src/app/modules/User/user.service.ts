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
  const savedUser = await User.findById({ _id: result._id });

  result.password = "";
  return savedUser;
};

export const UserServices = {
  createNewUserIntoDB,
};
