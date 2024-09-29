/* eslint-disable @typescript-eslint/no-explicit-any */
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
  } else {
    const isAlreadyFollowing = await Follow.findOne({
      _id: myFollow,
      followers: payload.followers,
    });

    if (isAlreadyFollowing) {
      throw new AppError(httpStatus.BAD_REQUEST, "User has already followed!");
    } else {
      const res = await Follow.findByIdAndUpdate(
        myFollow,
        { $addToSet: { followers: payload.followers } },
        { new: true }
      );

      return res;
    }
  }
};

const unfollowASingleUser = async (myId: string, followedUserId: string) => {
  const isUserExist = await User.isUserExistById(myId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const followRecord = await Follow.findOne({ userId: followedUserId });

  if (!followRecord) {
    throw new AppError(httpStatus.NOT_FOUND, "Follow record not found!");
  }

  const isFollowing = followRecord.followers.some(
    (follower) => follower.toString() === myId
  );

  if (!isFollowing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not following this user!"
    );
  }

  const updatedFollowRecord = await Follow.findOneAndUpdate(
    { userId: followedUserId },
    { $pull: { followers: myId } },
    { new: true }
  );

  return updatedFollowRecord;
};

const retrievedFollowerByIdIntoDB = async (userId: string) => {
  const isUserExist = await User.isUserExistById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  const res = await Follow.findOne({ userId }).populate("followers");

  return res;
};

export const socialConductivityServices = {
  createFollowIntoDB,
  unfollowASingleUser,
  retrievedFollowerByIdIntoDB,
};
