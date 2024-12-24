import httpStatus from "http-status";
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

  console.log("isUserExistInSociety", isUserExistInSociety);

  const result = await SocietyMember.create(payload);
  return result;
};

const getMemberByIdFromDB = async (userId: string) => {
  const result = await SocietyMember.find({ userId }).populate("societyId");

  return result;
};

const getSingleSocietyMemberBySocietyIdFromDB = async (societyId: string) =>
  await SocietyMember.find({ societyId }).populate("userId");

export const societyMemberService = {
  createSocietyMemberIntoDB,
  getMemberByIdFromDB,
  getSingleSocietyMemberBySocietyIdFromDB,
};
