import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyPostService } from "./societyPost.service";

const createSocietyPost = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await societyPostService.createSocietyPostIntoDB(
    req.body,
    image
  );

  res.status(200).json({
    success: true,
    message: "Society post created successfully!!",
    data: result,
  });
});

const getSocietyPost = catchAsync(async (req: Request, res: Response) => {
  const result = await societyPostService.getSocietyPostFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: "Society post retrieved successfully",
    data: result,
  });
});

export const societyPostController = {
  createSocietyPost,
  getSocietyPost,
};
