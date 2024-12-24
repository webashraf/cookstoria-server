import { model, Schema } from "mongoose";
import { ISocietyComment } from "./SocietyComment.interface";

const SocietyCommentSchema: Schema<ISocietyComment> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "SocietyMember",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "SocietyPost",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SocietyPostComment = model<ISocietyComment>(
  "SocietyPostComment",
  SocietyCommentSchema
);
