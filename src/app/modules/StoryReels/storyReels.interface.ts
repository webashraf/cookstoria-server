import { ObjectId } from "mongoose";

export interface IStoryReels {
  userId: ObjectId;
  images: Array<string>;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}
