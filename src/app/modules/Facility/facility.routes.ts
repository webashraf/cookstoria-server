import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { FacilityController } from "./facility.controller";
import { FacilityValidators } from "./facility.validation";

const router = Router();

router.post(
  "/",
  validateRequest(FacilityValidators.facilityValidationSchema),
  FacilityController.createFacility
);

router.put(
  "/:id",
  validateRequest(FacilityValidators.updeteFacilityValidationSchema),
  FacilityController.updateFacility
);

router.delete("/:id", FacilityController.deleteFacility);

router.get("/", FacilityController.retriveFacility);

export const facilityRoute = router;
