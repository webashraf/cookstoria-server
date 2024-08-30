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

const retrieveSingleUserIntoDB = async (payload: string) => {
  const res = await User.findOne({ email: payload });
  return res;
};

export const UserServices = {
  createNewUserIntoDB,
  retrieveSingleUserIntoDB: retrieveSingleUserIntoDB,
};
