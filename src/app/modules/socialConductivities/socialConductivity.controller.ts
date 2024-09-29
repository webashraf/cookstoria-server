import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { socialConductivityServices } from "./socialConductivity.service";

const createAFollower = catchAsync(async (req: Request, res: Response) => {
  const result = await socialConductivityServices.createFollowIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Successfully added new follower!!",
    data: result,
  });
});

const getFollowersById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result =
    await socialConductivityServices.retrievedFollowerByIdIntoDB(userId);
  res.status(200).json({
    success: true,
    message: "Followers retrieved successful!!",
    data: result,
  });
});

export const socialConductivityController = {
  createAFollower,
  getFollowersById,
};
