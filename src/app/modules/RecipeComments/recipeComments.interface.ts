import { ObjectId } from "mongoose";

export interface IComment {
  userId: ObjectId;
  description: string;
  rate: 0 | 1 | 2 | 3 | 4 | 5;
  upVote: 1 | 0;
  downVote: 1 | 0;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}

export interface IUserOpinions {
  postId: string;
  comments: IComment;
}
