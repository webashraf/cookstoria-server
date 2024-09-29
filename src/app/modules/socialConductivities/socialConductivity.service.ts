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

//   console.log(myId, followedUserId);

//   // Find the follow record for the followedUserId
//   const followRecord = await Follow.findOne({ userId: followedUserId });

//   console.log("followRecord", followRecord);

//   // Check if the follow record exists
//   if (!followRecord) {
//     throw new AppError(httpStatus.NOT_FOUND, "Follow record not found!");
//   }

//   // Check if the user is already following
//   const isFollowing = followRecord.followers.some(
//     (follower) => follower.toString() === myId
//   );

//   if (!isFollowing) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "You are not following this user!"
//     );
//   }

//   // Remove myId from the followers array
//   const updatedFollowRecord = await Follow.findByIdAndUpdate(
//     followedUserId,
//     { $pull: { followers: myId } }, // This will remove myId from the followers array
//     { new: true } // Return the updated document
//   );

//   // Return the updated follow record
//   return updatedFollowRecord;
// };

const unfollowASingleUser = async (myId: string, followedUserId: string) => {
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
  const res = await Follow.findOne({ userId }).populate("followers");

  return res;
};

export const socialConductivityServices = {
  createFollowIntoDB,
  unfollowASingleUser,
  retrievedFollowerByIdIntoDB,
};
