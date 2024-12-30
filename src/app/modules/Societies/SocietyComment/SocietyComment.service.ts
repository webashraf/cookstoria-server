/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISocietyComment } from "./SocietyComment.interface";
import { SocietyPostComment } from "./SocietyComment.model";

const createSocietyPostCommentIntoDB = async (payload: ISocietyComment) => {
  const result = SocietyPostComment.create(payload);
  return result;
};

const getSocietyCommentFormDB = async (query: Record<string, unknown>) => {
  const filterQueryItems: any = {
    ...query,
  };
  const removableFields = ["sort", "limit", "page", "fields"];
  removableFields.forEach((field) => delete filterQueryItems[field]);

  const allRecipe = await SocietyPostComment.find(filterQueryItems);

  // Filter query
  const filterQuery = SocietyPostComment.find(filterQueryItems).populate({
    path: "userId",
    populate: {
      path: "userId",
    },
  });



  // sort
  let sort = "-updatedAt";
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

  return {
    comments: filedLimitQuery,
    dataLength: allRecipe?.length,
  };
};
export const societyPostCommentService = {
  createSocietyPostCommentIntoDB,
  getSocietyCommentFormDB,
};
