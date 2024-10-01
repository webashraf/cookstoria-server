import { model, Schema } from "mongoose";
import { IComment, IUserOpinions } from "./recipeComments.interface";

const commentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
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
    default: Date.now.toString(),
  },
  updatedAt: {
    type: String,
    default: Date.now.toString(),
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

const userOpinionsSchema = new Schema<IUserOpinions>({
  postId: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
});

export const RecipeComments = model("RecipeComments", userOpinionsSchema);
