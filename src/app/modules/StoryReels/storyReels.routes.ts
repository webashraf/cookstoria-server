import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import { storyReelsContainer } from "./storyReels.controller";

const router = Router();

router.post(
  "/create",
  multerUpload.single("image"),
  parseBody,
  storyReelsContainer.createStoryReels
);
router.get("/", storyReelsContainer.getStoryReels);
router.delete("/:id", storyReelsContainer.removeAStroyImage);

export const storyReelsRoute = router;
