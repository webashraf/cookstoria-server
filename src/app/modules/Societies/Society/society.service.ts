/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../../error/appError";
import { User } from "../../user/user.model";
import { SocietyMember } from "../SocietyMember/societyMember.model";
import { ISociety } from "./society.interface";
import { Society } from "./society.model";

const createSocietyIntoDB = async (payload: ISociety, image: any) => {
  const isUserExist = await User.isUserExistById(payload?.admin);

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!");
  }

  const result = await Society.create({ ...payload, coverImage: image });
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

const getSingleSocietyFromDB = async (societyId: string) => {
  return await Society.findById(societyId).populate("admin");
};

const getSocietyFromDB = async () => await Society.find().populate("admin");

const updateSocietyIntoDB = async (societyId: string, payload: any) => {
  console.log(societyId, payload);

  try {
    const isSocietyExist = await Society.findById(societyId);
    if (!isSocietyExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Society does not exist!");
    }

    const updatedSociety = await Society.findByIdAndUpdate(societyId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedSociety) {
      throw new AppError(httpStatus.NOT_FOUND, "Failed to update the society!");
    }

    return updatedSociety;
  } catch (error) {
    console.error("Error updating society:", error);

    throw new AppError(
      httpStatus.NOT_FOUND,
      "Something went wrong for updating the society!"
    );
  }
};
export const societyServices = {
  createSocietyIntoDB,
  getSocietyForConnectFromDB,
  getSingleSocietyFromDB,
  getSocietyFromDB,
  updateSocietyIntoDB,
};
