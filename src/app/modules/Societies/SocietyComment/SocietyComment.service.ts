import { ISocietyComment } from "./SocietyComment.interface";
import { SocietyPostComment } from "./SocietyComment.model";

const createSocietyPostCommentIntoDB = async (payload: ISocietyComment) => {
  const result = SocietyPostComment.create(payload);
  return result;
};

const getSocietyCommentFormDB = async (postId: string) => {
  const result = SocietyPostComment.find({ postId }).populate({
    path: "userId",
    populate: {
      path: "userId",
    },
  });
  return result;
};

export const societyPostCommentService = {
  createSocietyPostCommentIntoDB,
  getSocietyCommentFormDB,
};
