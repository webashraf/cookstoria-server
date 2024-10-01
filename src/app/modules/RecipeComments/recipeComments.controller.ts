import catchAsync from "../../utils/catchAsync";
import { userOpinionsServices } from "./recipeComments.service";

const createRecipeUserOpinion = catchAsync(async (req, res) => {
  const result =
    await userOpinionsServices.createCommentUpDownVoteAndRatingsIntoDB(
      req.body
    );
  res.status(200).json({
    success: true,
    message: "Recipe status successfully updated!",
    data: result,
  });
});

const removeUserOpinions = catchAsync(async (req, res) => {
  const postId = req.query.postId as string;
  const userId = req.query.userId as string;

  const result = await userOpinionsServices.removeUserOpinionsFromRecipeIntoDB({
    postId,
    userId,
  });
  res.status(200).json({
    success: true,
    message: "Recipe status successfully updated!",
    data: result,
  });
});

export const userOpinionsController = {
  createRecipeUserOpinion,
  removeUserOpinions,
};
