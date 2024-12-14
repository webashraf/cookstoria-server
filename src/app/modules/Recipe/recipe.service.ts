/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.modal";

const createRecipeIntoDB = async (payload: IRecipe, image: any) => {
  const recipeData = {
    ...payload,
    imageUrl: image,
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

const updateRecipeIntoDB = async (
  rId: string,
  payload: Partial<IRecipe>,
  image?: any
) => {
  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const recipeData = {
    ...payload,
    ...(image && { imageUrl: image }),
    updatedAt: new Date(),
  };

  // Find and update the recipe
  const updatedRecipe = await Recipe.findByIdAndUpdate(rId, recipeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedRecipe) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }

  return updatedRecipe;
};

const deleteRecipeIntoDB = async (id: string) => {
  const res = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const updateRecipePartialInfo = async (id: string, query: any) => {
  const isRecipeExist: any = await Recipe.findById(id);

  if (!isRecipeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found!!");
  }

  const res = await Recipe.findByIdAndUpdate(id, query, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return res;
};

const getRecipeFromDB = async (query: Record<string, unknown>) => {
  const filterQueryItems: any = {
    ...query,
  };
  const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
  removableFields.forEach((field) => delete filterQueryItems[field]);

  // search
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const searchQuery = Recipe.find({
    $or: ["title", "ingredients", "tags"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const allRecipe = await Recipe.find();

  // Filter query
  const filterQuery = searchQuery.find(filterQueryItems).populate("user");

  // sort
  let sort = "-upVote";
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 0;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query.limit) as number;
  }
  if (query?.page) {
    page = Number(query?.page) as number;
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query?.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }
  const filedLimitQuery = await limitQuery.select(fields);

  const premiumRecipe = await Recipe.find({ isPremium: true });

  return {
    recipes: filedLimitQuery,
    dataLength: allRecipe?.length,
    premiumRecipe: premiumRecipe.length,
  };
};

export const recipeService = {
  getRecipeFromDB,
  updateRecipeIntoDB,
  createRecipeIntoDB,
  deleteRecipeIntoDB,
  updateRecipePartialInfo,
};
