import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.modal";

const createRecipeIntoDB = async (payload: IRecipe) => {
  const recipeData = {
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const res = await Recipe.create(recipeData);
  return res;
};

export const recipeService = {
  createRecipeIntoDB,
};
