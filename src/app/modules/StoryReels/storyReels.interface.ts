import { ObjectId } from "mongoose";

export interface IStoryReels {
  user: ObjectId;
  images: Array<string>;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}
