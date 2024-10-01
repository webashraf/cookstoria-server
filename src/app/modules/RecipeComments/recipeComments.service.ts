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
  const { postId, comments } = payload;
  const { userId, upVote, downVote, rate, description } = comments;

  // Check if the post exists
  const isPostExist = await Recipe.findById(postId);
  if (!isPostExist) {
    throw new AppError(httpStatus.FORBIDDEN, "Post does not exist!!");
  }

  // Check if the user exists
  const isUserExist = await User.isUserExistById(userId as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.FORBIDDEN, "User does not exist!!");
  }

  const commentFilter = { postId, "comments.userId": userId };
  const postComment = await RecipeComments.findOne(commentFilter);

  if (postComment) {
    const update: any = {};

    // If user upvotes, set upVote to 1 and downVote to 0
    if (upVote) {
      update.$set = { "comments.$.upVote": 1, "comments.$.downVote": 0 };
    }

    // If user downvotes, set downVote to 1 and upVote to 0
    if (downVote) {
      update.$set = { "comments.$.downVote": 1, "comments.$.upVote": 0 };
    }

    // Update the rating if it's passed in the request
    if (rate !== undefined) {
      update.$set = { ...update.$set, "comments.$.rate": rate };
    }

    // Update the description if it's passed in the request
    if (description) {
      update.$set = { ...update.$set, "comments.$.description": description };
    }

    // Update the existing comment
    const res = await RecipeComments.findOneAndUpdate(commentFilter, update, {
      new: true,
    });

    return res;
  } else {
    // Create a new comment if it doesn't exist
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
  console.log({ postId, userId });

  const isPostExist = await Recipe.findById(postId);
  if (!isPostExist) {
    throw new AppError(httpStatus.FORBIDDEN, "Post does not exist!!");
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

export const userOpinionsServices = {
  createCommentUpDownVoteAndRatingsIntoDB,
  removeUserOpinionsFromRecipeIntoDB,
};
