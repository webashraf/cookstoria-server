import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { ISocialConductivity } from "./socialConductivity.interface";
import { Follow } from "./socialConductivity.model";

const createFollowIntoDB = async (payload: ISocialConductivity) => {
  const isUserExist = await User.isUserExistById(payload.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!!");
  }

  const haveFollowerInMyRecipe = await Follow.findOne({
    userId: payload.userId,
  });

  const myFollow = haveFollowerInMyRecipe?._id;

  if (!haveFollowerInMyRecipe) {
    const res = await Follow.create(payload);
    return res;
  } else if (haveFollowerInMyRecipe) {
    const res = await Follow.findByIdAndUpdate(
      myFollow,
      { $push: { followers: { $each: [payload.followers] } } },
      { new: true }
    );

    return res;
  }
};

const retrievedFollowerByIdIntoDB = async (userId: string) => {
  const res = await Follow.findOne({ userId }).populate("followers");

  return res;
};

export const socialConductivityServices = {
  createFollowIntoDB,
  retrievedFollowerByIdIntoDB,
};
