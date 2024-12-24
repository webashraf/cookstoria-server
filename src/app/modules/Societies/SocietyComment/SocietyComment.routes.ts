import { Router } from "express";
import { societyPostCommentController } from "./SocietyComment.controller";

const router = Router();

router.post("/create", societyPostCommentController.createSocietyPostComment);

router.get(
  "/post-comments/:id",
  societyPostCommentController.getSocietyComment
);

export const societyPostCommentRoutes = router;
