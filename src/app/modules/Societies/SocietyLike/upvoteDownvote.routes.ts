import { Router } from "express";
import { upvoteDownVoteController } from "./upvoteDownvote.controller";

const router = Router();

router.post("/update", upvoteDownVoteController.createOrUpdateUpvoteDownvote);
router.get("/:id", upvoteDownVoteController.getUpvoteDownvoteFromDB);

export const upvoteDownvote = router;
