import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";

const loginUserFromDB = async (payload: TLoginUser) => {
  console.log({ payload });
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new Error("Could not find user!!");
  }

  const isPasswordOk = await bcrypt.compare(payload?.password, user?.password);

  if (isPasswordOk === false) {
    throw new Error("Password is not match!!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret_key as string,
    { expiresIn: "90d" }
  );

  const savedUser = await User.findOne({ email: payload.email });

  return {
    accessToken,
    savedUser,
  };
};

export const AuthService = {
  loginUserFromDB,
};
