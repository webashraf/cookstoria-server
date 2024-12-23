import { Router } from "express";
import { societyController } from "./society.controller";

const router = Router();

router.post("/create", societyController.createSociety);
router.get("/society-for-connect/:id", societyController.getSocietyForConnect);
router.get("/", societyController.getSociety);

export const societyRoutes = router;
