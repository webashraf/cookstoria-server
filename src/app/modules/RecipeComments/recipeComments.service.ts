/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Recipe } from "../Recipe/recipe.modal";
import { User } from "../user/user.model";
import { IUserOpinions } from "./recipeComments.interface";
import { RecipeComments } from "./recipeComments.modal";

const createUserOpinionIntoDB = async (payload: IUserOpinions | any) => {
  const isPostExist = await Recipe.findById(payload.postId);
  const isUserExist = await User.isUserExistById(payload.comments.userId);
  const isPostCommentExist = await RecipeComments.findOne({
    postId: payload.postId,
  });

  if (!isPostExist) {
    throw new AppError(httpStatus.FORBIDDEN, "Post does not exist!!");
  }

  if (!isUserExist) {
    throw new AppError(httpStatus.FORBIDDEN, "User does not exist!!");
  }

  if (isPostCommentExist) {
    const res = await RecipeComments.findOneAndUpdate(
      { postId: payload.postId },
      { $addToSet: { comments: payload.comments } },
      { new: true }
    );

    return res;
  } else {
    const res = await RecipeComments.create(payload);
    return res;
  }
};

export const userOpinionsServices = {
  createUserOpinionIntoDB,
};
