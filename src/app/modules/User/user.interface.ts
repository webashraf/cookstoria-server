import { USER_ROLE } from "./user.const";

export interface TUser {
  email: string;
  password: string;
  username: string;
  profilePicture: File | null;
  role: "admin" | "user";
}

export type TUserRole = keyof typeof USER_ROLE;
