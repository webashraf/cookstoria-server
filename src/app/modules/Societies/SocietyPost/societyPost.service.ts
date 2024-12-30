/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../../error/appError";
import { Society } from "../Society/society.model";
import { SocietyMember } from "../SocietyMember/societyMember.model";
import { ISocietyPost } from "./societyPost.interface";
import { SocietyPost } from "./societyPost.model";

const createSocietyPostIntoDB = async (payload: ISocietyPost, image: any) => {
  const isUserExist = await SocietyMember.findById(payload?.userId);
  const isSocietyExist = await Society.findById(payload?.societyId);
  const isUserExistInCurrentSociety = await SocietyMember.find({
    societyId: payload?.societyId,
    userId: payload?.userId,
  });
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!");
  }
  if (!isSocietyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Society does not exist!");
  }

  if (!isUserExistInCurrentSociety) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User does not exist this society!"
    );
  }

  const result = await SocietyPost.create({ ...payload, imageUrl: image });

  return result;
};

const getSocietyPostFromDB = async (societyId: string) => {
  const result = await SocietyPost.find({ societyId }).populate({
    path: "userId",
    populate: {
      path: "userId",
    },
  });

  return result;
};

export const societyPostService = {
  createSocietyPostIntoDB,
  getSocietyPostFromDB,
};
