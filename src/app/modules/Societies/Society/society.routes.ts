import { Router } from "express";
import { societyController } from "./society.controller";

const router = Router();

router.post("/create", societyController.createSociety);
router.get("/", societyController.getSociety);

export const societyRoutes = router;
