import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { socialConnectivityServices } from "./socialConnection.service";

const createAFollower = catchAsync(async (req: Request, res: Response) => {
  const result = await socialConnectivityServices.createFollowIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Successfully added new follower!!",
    data: result,
  });
});

const unfollowAUser = catchAsync(async (req: Request, res: Response) => {
  const result = await socialConnectivityServices.unfollowASingleUser(
    req?.params?.id,
    req?.body?.followedUserId
  );

  res.status(200).json({
    success: true,
    message: "Successfully added new follower!!",
    data: result,
  });
});

const getFollowersById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result =
    await socialConnectivityServices.retrievedFollowerByIdIntoDB(userId);
  res.status(200).json({
    success: true,
    message: "Followers retrieved successful!!",
    data: result,
  });
});
const getFollowers = catchAsync(async (req: Request, res: Response) => {
  const result = await socialConnectivityServices.retrievedFollowerIntoDB();
  res.status(200).json({
    success: true,
    message: "Followers retrieved successful!!",
    data: result,
  });
});

export const socialConnectivityController = {
  createAFollower,
  unfollowAUser,
  getFollowersById,
  getFollowers,
};
