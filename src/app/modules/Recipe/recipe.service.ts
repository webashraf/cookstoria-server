/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { User } from "../user/user.model";
import { IRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.modal";

const createRecipeIntoDB = async (payload: IRecipe, image: any) => {
  console.log(payload, { image });
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

  if (recipe?.status === "unpublish") {
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

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query?.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }
  const filedLimitQuery = await limitQuery.select(fields);

  return filedLimitQuery;
};

const getMyRecipeFromDB = async (query: Record<string, unknown>) => {
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

  return filedLimitQuery;
};

export const recipeService = {
  getRecipeFromDB,
  createRecipeIntoDB,
  deleteRecipeIntoDB,
  publishOrUnpublishRecipeIntoDB,
  getMyRecipeFromDB,
};
