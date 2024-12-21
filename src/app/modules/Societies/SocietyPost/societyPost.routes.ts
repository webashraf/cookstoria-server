import { Router } from "express";
import { societyPostController } from "./societyPost.controller";

const router = Router();

router.post("/create", societyPostController.createSocietyPost);

export const societyPostRoutes = router;
