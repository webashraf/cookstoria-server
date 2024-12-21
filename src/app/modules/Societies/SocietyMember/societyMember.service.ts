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
  console.log("isUserExistInSociety", isUserExistInSociety);

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

export const societyMemberService = {
  createSocietyMemberIntoDB,
};
