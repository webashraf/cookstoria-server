import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { boolean } from "zod";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isPremium: boolean,
  paymentStatus: {
    success: { type: Boolean, required: true },
    transaction: { type: String, required: true },
    amount: { type: Number, required: true },
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  this.needsPasswordChange = true;
  this.isDeleted = false;
  this.status = "active";
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({
    email,
    isDeleted: false,
    status: "active",
  }).select("+password");
};

userSchema.statics.isUserExistById = async function (_id: string) {
  return await User.findOne({
    _id,
    isDeleted: false,
    status: "active",
  }).select("+password");
};

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser, UserModel>("User", userSchema);
