import { ObjectId } from "mongoose";

export interface ISocietyPost {
  societyId: ObjectId;
  userId: ObjectId;
  content?: string;
  imageUrl?: string;
  createdAt: Date;
}
