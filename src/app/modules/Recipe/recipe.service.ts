/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.modal";

const createRecipeIntoDB = async (payload: IRecipe) => {
  const recipeData = {
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const res = await Recipe.create(recipeData);
  return res;
};

const deleteRecipeIntoDB = async (id: string) => {
  const res = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const publishOrUnpublishRecipeIntoDB = async (id: string) => {
  const recipe: any = await Recipe.findById(id);
  // console.log(recipe);
  if (recipe?.status === "unpublish") {
    // console.log(recipe?.status);
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

const getRecipeFromDB = async () => {
  const res = await Recipe.find().populate("user");

  return res;
};

export const recipeService = {
  getRecipeFromDB,
  createRecipeIntoDB,
  deleteRecipeIntoDB,
  publishOrUnpublishRecipeIntoDB,
};
