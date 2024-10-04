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

const getRecipeFromDB = async (query: Record<string, unknown>) => {
  const filterQueryItems = { ...query };
  const removableFields = ["searchTerm", "sort", "limit", "page"];
  removableFields.forEach((field) => delete filterQueryItems[field]);

  // search
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const searchQuery = Recipe.find({
    title: { $regex: searchTerm, $options: "i" },
  });
  
  console.log({ query }, { filterQueryItems });
  // Filter query
  const filterQuery = searchQuery.find(filterQueryItems).populate("user");

  // sort
  let sort = "-cookingTime";
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

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

export const recipeService = {
  getRecipeFromDB,
  createRecipeIntoDB,
  deleteRecipeIntoDB,
  publishOrUnpublishRecipeIntoDB,
};
