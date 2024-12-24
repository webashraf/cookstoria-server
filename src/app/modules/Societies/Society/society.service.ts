/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../../error/appError";
import { User } from "../../user/user.model";
import { SocietyMember } from "../SocietyMember/societyMember.model";
import { ISociety } from "./society.interface";
import { Society } from "./society.model";

const createSocietyIntoDB = async (payload: ISociety) => {
  const isUserExist = await User.isUserExistById(payload?.admin);

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!");
  }

  const result = await Society.create(payload);
  return result;
};

const getSocietyForConnectFromDB = async (userId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const societyMemberConnectedness = await SocietyMember.find({
      userId,
    }).session(session);

    const societyIds = societyMemberConnectedness.map(
      (member) => member.societyId
    );

    const unmatchedSocieties = await Society.find({
      _id: { $nin: societyIds },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return unmatchedSocieties;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error during transaction:", error);
    throw error;
  }
};

const getSocietyFromDB = async () => await Society.find();

const getSingleSocietyFromDB = async (societyId: string) => {
  return await Society.findById(societyId);
};

export const societyServices = {
  createSocietyIntoDB,
  getSocietyForConnectFromDB,
  getSingleSocietyFromDB,
  getSocietyFromDB,
};
