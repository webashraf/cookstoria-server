/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Recipe } from "../Recipe/recipe.modal";
import { User } from "../user/user.model";
import { IUserOpinions } from "./recipeComments.interface";
import { RecipeComments } from "./recipeComments.modal";

const createCommentUpDownVoteAndRatingsIntoDB = async (
  payload: IUserOpinions
) => {
  const { postId, userId, upVote, downVote } = payload;

  const isPostExist = await Recipe.findById(postId);
  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post does not exist!!");
  }

  const isUserExist = await User.isUserExistById(userId as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const commentFilter = { postId, userId };
  const postComment = await RecipeComments.findOne(commentFilter);

  if (postComment) {
    const update: any = { ...payload };

    if (upVote) {
      update.upVote = 1;
      update.downVote = 0;
    }

    if (downVote) {
      update.downVote = 1;
      update.upVote = 0;
    }


    // Update the existing comment
    const res = await RecipeComments.findOneAndUpdate(commentFilter, update, {
      new: true,
    });
    return res;
  } else {
    const res = await RecipeComments.create(payload);
    return res;
  }
};

const removeUserOpinionsFromRecipeIntoDB = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const isPostExist = await Recipe.findById(postId);
  if (!isPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post does not exist!!");
  }

  const commentFilter = { postId, "comments.userId": userId };
  const postComment = await RecipeComments.findOne(commentFilter);

  if (!postComment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Comment does not exist for this user!!"
    );
  } else {
    const update: any = { isDeleted: true };
    update.$set = { "comments.$.description": "" };
    const res = await RecipeComments.findOneAndUpdate(commentFilter, update, {
      new: true,
    });

    return res;
  }
};

const getCommentsInfo = async (postId: string) => {
  const res = await RecipeComments.find({ postId }).populate("userId");
  return res;
};

export const userOpinionsServices = {
  createCommentUpDownVoteAndRatingsIntoDB,
  removeUserOpinionsFromRecipeIntoDB,
  getCommentsInfo,
};
