import { model, Schema } from "mongoose";
import { ISocietyPost } from "./societyPost.interface";

const societyPostSchema: Schema<ISocietyPost> = new Schema(
  {
    societyId: {
      type: Schema.Types.ObjectId,
      ref: "Society",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "SocietyMember",
      required: true,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const SocietyPost = model<ISocietyPost>(
  "SocietyPost",
  societyPostSchema
);
