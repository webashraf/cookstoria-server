import { Router } from "express";
import { societyController } from "./society.controller";

const router = Router();

router.post("/create", societyController.createSociety);

export const societyRoutes = router;
