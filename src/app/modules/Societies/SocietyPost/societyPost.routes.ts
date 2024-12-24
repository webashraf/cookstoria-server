import { Router } from "express";
import { multerUpload } from "../../../config/multer.config";
import { parseBody } from "../../../middleware/parseBody";
import { societyPostController } from "./societyPost.controller";

const router = Router();

router.post(
  "/create",
  multerUpload.single("image"),
  parseBody,
  societyPostController.createSocietyPost
);

router.get("/:id", societyPostController.getSocietyPost);

export const societyPostRoutes = router;
