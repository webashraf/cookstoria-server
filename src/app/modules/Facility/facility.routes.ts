import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../User/user.const";
import { FacilityController } from "./facility.controller";
import { FacilityValidators } from "./facility.validation";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidators.facilityValidationSchema),
  FacilityController.createFacility
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidators.updateFacilityValidationSchema),
  FacilityController.updateFacility
);

router.delete("/:id", auth(USER_ROLE.admin), FacilityController.deleteFacility);

router.get("/", FacilityController.retrieveFacility);

export const facilityRoute = router;
