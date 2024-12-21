/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, ObjectId } from "mongoose";
import { USER_ROLE } from "./user.const";

export interface TUser {
  _id: any;
  username: string;
  email: string;
  password: string;
  profilePicture: File | null;
  role: TUserRole;
  isDeleted?: boolean;
  status?: "active" | "blocked";
  needsPasswordChange?: boolean;
  isPremium?: boolean;
  paymentStatus: {
    success: boolean;
    transaction: string;
    amount: number;
    date: string;
  };
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser | null>;
  isUserExistById(userId: ObjectId): Promise<TUser | null>;
}
