import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyPostService } from "./societyPost.service";

const createSocietyPost = catchAsync(async (req: Request, res: Response) => {
  const result = await societyPostService.createSocietyPostIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Society post created successfully!!",
    data: result,
  });
});

export const societyPostController = {
  createSocietyPost,
};
