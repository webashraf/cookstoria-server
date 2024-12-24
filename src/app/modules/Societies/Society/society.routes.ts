import { Router } from "express";
import { societyController } from "./society.controller";

const router = Router();

router.post("/create", societyController.createSociety);
router.get("/society-for-connect/:id", societyController.getSocietyForConnect);
router.get("/", societyController.getSociety);
router.get("/single/:id", societyController.getSingleSociety);

export const societyRoutes = router;
