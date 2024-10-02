import { model, Schema } from "mongoose";
import { IUserOpinions } from "./recipeComments.interface";

const userOpinionsSchema = new Schema<IUserOpinions>({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: {
    type: String,
    default: "",
  },
  rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  upVote: {
    type: Number,
    default: 0,
    max: 1,
  },
  downVote: {
    type: Number,
    default: 0,
    max: 1,
  },
  createdAt: {
    type: String,
    default: new Date().toString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toString(),
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

export const RecipeComments = model("RecipeComments", userOpinionsSchema);
