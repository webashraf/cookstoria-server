/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IsocialConnectivity } from "./socialConnection.interface";
import { Follow } from "./socialConnection.model";

const createFollowIntoDB = async (payload: IsocialConnectivity) => {
  const isUserExist = await User.isUserExistById(payload.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!!");
  }

  const haveFollower = await Follow.findOne({
    userId: payload.userId,
  });

  const myFollow = haveFollower?._id;

  if (!haveFollower) {
    // await User.findByIdAndUpdate(payload.userId, { follows: 1 });
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

  const followRecord = await Follow.findOne({ followers: followedUserId });

  if (!followRecord) {
    throw new AppError(httpStatus.NOT_FOUND, "Follow record not found!");
  }

  const updatedFollowRecord = await Follow.findOneAndUpdate(
    { userId: myId },
    { $pull: { followers: followedUserId } },
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

const retrievedFollowerIntoDB = async () => {
  const res = await Follow.find().populate("followers");

  return res;
};

export const socialConnectivityServices = {
  createFollowIntoDB,
  unfollowASingleUser,
  retrievedFollowerByIdIntoDB,
  retrievedFollowerIntoDB,
};
