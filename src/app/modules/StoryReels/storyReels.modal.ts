import { model, Schema } from "mongoose";
import { IStoryReels } from "./storyReels.interface";

const userOpinionsSchema = new Schema<IStoryReels>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  images: {
    type: [String],
    required: true,
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

export const StoryReels = model("StoryReels", userOpinionsSchema);
