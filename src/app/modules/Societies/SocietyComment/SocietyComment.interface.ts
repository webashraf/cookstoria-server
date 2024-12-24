import { ObjectId } from "mongoose";

export interface ISocietyComment {
  postId: ObjectId;
  userId: ObjectId;
  comment: string;
  createdAt: Date;
}
