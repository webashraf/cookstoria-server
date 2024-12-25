import { model, Schema } from "mongoose";
import { IUpvoteDownvote } from "./upvoteDownvotef.interface";

const UpvoteDownvoteSchema: Schema<IUpvoteDownvote> = new Schema(
  {
    postId: {
      type: String,
      ref: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: String,
      ref: Schema.Types.ObjectId,
      required: true,
    },
    voteType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UpvoteDownvote = model<IUpvoteDownvote>(
  "UpvoteDownvote",
  UpvoteDownvoteSchema
);
