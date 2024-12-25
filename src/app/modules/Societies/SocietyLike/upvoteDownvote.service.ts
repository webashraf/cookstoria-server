import { ObjectId } from "mongoose";
import { UpvoteDownvote } from "./upvoteDownvote.model";

const createOrUpdateUpvoteDownvoteIntoDB = async (payload: {
  postId: ObjectId;
  userId: ObjectId;
  voteType: "upvote" | "downvote";
}) => {
  try {
    const { postId, userId, voteType } = payload;

    const result = await UpvoteDownvote.findOneAndUpdate(
      { postId, userId },
      { voteType, createdAt: new Date() },
      { upsert: true, new: true }
    );

    return result;
  } catch (error) {
    console.error("Error creating or updating Upvote Downvote:", error);
    throw error;
  }
};

const getUpvoteDownvoteFromDB = async (postId: ObjectId) => {
  const upvote = await UpvoteDownvote.find({ postId, voteType: "upvote" });
  const downvote = await UpvoteDownvote.find({ postId, voteType: "downvote" });
  return { upvote, downvote };
};

export const upvoteDownvoteService = {
  createOrUpdateUpvoteDownvoteIntoDB,
  getUpvoteDownvoteFromDB,
};
