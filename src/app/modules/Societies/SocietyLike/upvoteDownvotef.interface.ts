import { ObjectId } from "mongoose";

export interface IUpvoteDownvote {
  postId: ObjectId;
  userId: ObjectId;
  voteType: "upvote" | "downvote";
  createdAt: Date;
}
