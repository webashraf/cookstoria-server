import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { FacilityService } from "./facility.service";
import { FacilityValidators } from "./facility.validation";
import { FacilityController } from "./facility.controller";

const router = Router();


router.post(
  "/",
  validateRequest(FacilityValidators.facilityValidationSchema),
  FacilityController.createFacility
);


export const facilityRoute = router;
