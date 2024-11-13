/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Recipe } from "../Recipe/recipe.modal";
import { User } from "../user/user.model";
import { IStoryReels } from "./storyReels.interface";
import { StoryReels } from "./storyReels.modal";

const createUpdateStory = async (payload: IStoryReels) => {
  const { userId, images } = payload;

  const isStoryExist = await StoryReels.findById({ userId });

  const isUserExist = await User.isUserExistById(userId as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  if (isStoryExist) {
    // return res;
  } else {
    const res = await StoryReels.create(payload);
    return res;
  }
};

const getStories = async () => {
  const res = await Recipe.find().populate("userId");
  return res;
};

export const storyReelsServices = {
  createUpdateStory,
  getStories,
};
