import { ObjectId } from "mongoose";

export interface ISocietyPost {
  societyId: ObjectId;
  userId: ObjectId;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  createdAt: Date;
}
