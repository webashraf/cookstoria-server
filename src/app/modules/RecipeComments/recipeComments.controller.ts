import catchAsync from "../../utils/catchAsync";
import { userOpinionsServices } from "./recipeComments.service";

const createRecipeUserOpinion = catchAsync(async (req, res) => {
  const result = await userOpinionsServices.createUserOpinionIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Recipe status successfully updated!",
    data: result,
  });
});

export const userOpinionsController = {
  createRecipeUserOpinion,
};
