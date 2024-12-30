import catchAsync from "../../utils/catchAsync";
import { storyReelsServices } from "./storyReels.service";

const createStoryReels = catchAsync(async (req, res) => {
  const image: string | undefined = req?.file?.path;
  const result = await storyReelsServices.createUpdateStory(
    req.body,
    image as string
  );
  res.status(200).json({
    success: true,
    message: "Story created successfully updated!",
    data: result,
  });
});

const removeAStroyImage = catchAsync(async (req, res) => {
  const result = await storyReelsServices.removeImageFromStory(
    req.params.id,
    req.body.image
  );
  res.status(200).json({
    success: true,
    message: "Story image is deleted successfully!",
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
  removeAStroyImage,
  getStoryReels,
};
