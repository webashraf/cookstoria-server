/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface TUser {
  username: string;
  email: string;
  password: string;
  profilePicture: File | null;
  role: TUserRole;
  isDeleted?: boolean;
  status?: "active" | "blocked";
  needsPasswordChange?: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser | null>;
  isUserExistById(id: string): Promise<TUser | null>;
}
