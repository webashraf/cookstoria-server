import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { recipeService } from "./recipe.service";

const createRecipe = catchAsync(async (req: Request, res: Response) => {
  const result = await recipeService.createRecipeIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Recipe is created successfully!",
    data: result,
  });
});

export const recipeController = {
  createRecipe,
};
