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

const deleteRecipe = catchAsync(async (req: Request, res: Response) => {
  const result = await recipeService.deleteRecipeIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Recipe is deleted successfully!",
    data: result,
  });
});

const publishUnpublishRecipe = catchAsync(
  async (req: Request, res: Response) => {
    const result = await recipeService.publishOrUnpublishRecipeIntoDB(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Recipe status successfully updated!",
      data: result,
    });
  }
);

const getRecipe = catchAsync(async (req: Request, res: Response) => {
  const result = await recipeService.getRecipeFromDB();
  res.status(200).json({
    success: true,
    message: "Recipe successfully get!",
    data: result,
  });
});

export const recipeController = {
  getRecipe,
  createRecipe,
  deleteRecipe,
  publishUnpublishRecipe,
};
