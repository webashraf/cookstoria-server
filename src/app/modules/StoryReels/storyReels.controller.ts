import catchAsync from "../../utils/catchAsync";
import { storyReelsServices } from "./storyReels.service";

const createStoryReels = catchAsync(async (req, res) => {
  const result = await storyReelsServices.createUpdateStory(req.body);
  res.status(200).json({
    success: true,
    message: "Story created successfully updated!",
    data: result,
  });
});

const getStoryReels = catchAsync(async (req, res) => {
  const result = await storyReelsServices.getStories();
  res.status(200).json({
    success: true,
    message: "Stories successfully retrieved!",
    data: result,
  });
});

export const storyReelsContainer = {
  createStoryReels,
  getStoryReels,
};
