import { Router } from "express";
import { storyReelsContainer } from "./storyReels.controller";

const router = Router();

router.post("/create", storyReelsContainer.createStoryReels);
router.get("/", storyReelsContainer.getStoryReels);

export const storyReelsRoute = router;
