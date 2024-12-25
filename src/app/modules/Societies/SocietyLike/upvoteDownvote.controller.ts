/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { upvoteDownvoteService } from "./upvoteDownvote.service";

const createOrUpdateUpvoteDownvote = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await upvoteDownvoteService.createOrUpdateUpvoteDownvoteIntoDB(req.body);

    res.status(200).send({
      success: true,
      message: "Society like updated successfully!",
      data: result,
    });
  }
);

const getUpvoteDownvoteFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await upvoteDownvoteService.getUpvoteDownvoteFromDB(
      req.params.id as any
    );

    res.status(200).send({
      success: true,
      message: "Society votes retrieved successfully!!",
      data: result,
    });
  }
);

export const upvoteDownVoteController = {
  createOrUpdateUpvoteDownvote,
  getUpvoteDownvoteFromDB,
};
