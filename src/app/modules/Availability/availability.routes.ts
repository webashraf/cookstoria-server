import { Router } from "express";
import { CheckAvailabilityController } from "./availability.controller";

const router = Router();

router.get("/", CheckAvailabilityController.checkAvailability);

export const availabilityRoute = router;
