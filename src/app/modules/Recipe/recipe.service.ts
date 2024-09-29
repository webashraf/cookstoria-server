/* eslint-disable @typescript-eslint/no-explicit-any */
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

const deleteRecipeIntoDB = async (id: string) => {
  const res = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: true }, // This will add or update the field
    { new: true, runValidators: true, upsert: true } // Creates a new doc if one doesn't exist (optional)
  );

  return res;
};

const publishOrUnpublishRecipeIntoDB = async (id: string) => {
  const recipe: any = await Recipe.findById(id);
  console.log(recipe);
  if (recipe?.status === "unpublish") {
    console.log(recipe?.status);
    const res = await Recipe.findByIdAndUpdate(
      id,
      { status: "publish" },
      { new: true, runValidators: true, upsert: true }
    );
    return res;
  } else if (recipe?.status === "publish") {
    const res = await Recipe.findByIdAndUpdate(
      id,
      { status: "unpublish" },
      { new: true, runValidators: true, upsert: true }
    );

    return res;
  }
};

export const recipeService = {
  createRecipeIntoDB,
  deleteRecipeIntoDB,
  publishOrUnpublishRecipeIntoDB,
};
