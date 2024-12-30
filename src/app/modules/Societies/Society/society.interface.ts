import { ObjectId } from "mongoose";

export interface ISociety {
  societyName: string;
  description: string;
  coverImage: string;
  privacyType: "Public" | "Private";
  admin: ObjectId;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
