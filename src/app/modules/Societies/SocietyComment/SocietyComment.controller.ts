import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyPostCommentService } from "./SocietyComment.service";

const createSocietyPostComment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await societyPostCommentService.createSocietyPostCommentIntoDB(req.body);
    res.status(200).send({
      success: true,
      message: "Society post comment created successfully!!",
      data: result,
    });
  }
);

const getSocietyComment = catchAsync(async (req: Request, res: Response) => {
  const result = await societyPostCommentService.getSocietyCommentFormDB(
    req.params.id
  );

  res.status(200).send({
    success: true,
    message: "Society post comment retrieve successfully",
    data: result,
  });
});

export const societyPostCommentController = {
  createSocietyPostComment,
  getSocietyComment,
};
