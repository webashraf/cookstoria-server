/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IStoryReels } from "./storyReels.interface";
import { StoryReels } from "./storyReels.modal";

const createUpdateStory = async (payload: IStoryReels, image: string) => {
  const { user } = payload;

  console.log("Hello mr. this is storyReels service!", payload, image);
  const isUserExist = await User.isUserExistById(user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const res = await StoryReels.findOneAndUpdate(
    { user },
    {
      $push: { images: image },

      $set: { updatedAt: new Date() },
    },
    { new: true, upsert: true }
  );

  return res;
};

const removeImageFromStory = async (storyId: string, imageUrl: string) => {
  console.log(storyId, imageUrl);
  const isStoryExist = await StoryReels.findById(storyId as any);

  if (!isStoryExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  // Remove the image from the images array
  const updatedStory = await StoryReels.findByIdAndUpdate(
    storyId,
    {
      $pull: { images: imageUrl },
    },
    { new: true }
  );

  if (!updatedStory) {
    throw new AppError(httpStatus.NOT_FOUND, "Story not found!!");
  }

  // Check if the images array is empty after the update
  if (updatedStory.images.length === 0) {
    // If empty, delete the entire story document
    await StoryReels.findByIdAndDelete(storyId);
    return { message: "Story deleted as it contained no more images." };
  }

  return updatedStory;
};

const getStories = async () => {
  const res = await StoryReels.find().populate("user").sort("-updatedAt");
  return res;
};

export const storyReelsServices = {
  createUpdateStory,
  removeImageFromStory,
  getStories,
};
