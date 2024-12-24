import { Schema, model } from "mongoose";
import { ISociety } from "./society.interface";

const societySchema: Schema<ISociety> = new Schema(
  {
    societyName: {
      type: String,
      required: true,
      unique: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    privacyType: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Society = model<ISociety>("Society", societySchema);
