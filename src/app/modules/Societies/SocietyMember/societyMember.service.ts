/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus, { NOT_FOUND } from "http-status";
import AppError from "../../../error/appError";
import { User } from "../../user/user.model";
import { Society } from "../Society/society.model";
import { ISocietyMember } from "./societyMember.interface";
import { SocietyMember } from "./societyMember.model";

const createSocietyMemberIntoDB = async (payload: ISocietyMember) => {
  const isUserExist = await User.isUserExistById(payload.userId);
  const isSocietyExist = await Society.findById(payload.societyId);
  const isUserExistInSociety = await SocietyMember.findOne({
    userId: payload.userId,
    societyId: payload.societyId,
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }
  if (!isSocietyExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Society does not exist!!");
  }
  if (isUserExistInSociety) {
    throw new Error("User all ready exist in this society!");
  }

  const result = await SocietyMember.create(payload);
  return result;
};

// * get all users by a original userId
// ! Keep it for quantum
const getMemberByIdFromDB = async (userId: string) => {
  const result = await SocietyMember.find({ userId }).populate("societyId");

  return result;
};

// * get current login society single user
const getCurrentSocietyMemberByUserIdFromDB = async (queries: any) => {
  const { userId, societyId } = queries;
  const isUserExist = await User.isUserExistById(userId as any);
  const isSocietyExist = await Society.findById(societyId);
  if (!isUserExist) {
    throw new AppError(NOT_FOUND, "user not found!");
  }
  if (!isSocietyExist) {
    throw new AppError(NOT_FOUND, "Society not found!");
  }

  const result = await SocietyMember.findOne({
    userId,
    societyId,
  }).populate("userId");
  return result;
};

// * Get all members for a single society
const getSingleSocietyMembersBySocietyIdFromDB = async (societyId: string) =>
  await SocietyMember.find({ societyId }).populate("userId");

export const societyMemberService = {
  createSocietyMemberIntoDB,
  getMemberByIdFromDB,
  getSingleSocietyMembersBySocietyIdFromDB,
  getCurrentSocietyMemberByUserIdFromDB,
};
