import { ObjectId } from "mongoose";

export interface ISociety {
  societyName: string;
  description: string;
  privacyType: "Public" | "Private";
  admin: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
