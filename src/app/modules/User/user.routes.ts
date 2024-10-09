import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { userValidations } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidations.userCreateValidationSchema),
  userController.signupUser
);
router.put(
  "/update-user/:id",
  validateRequest(userValidations.userUpdateValidationSchema),
  userController.updateUserInfo
);
router.put(
  "/update-user-profile-info/:id",
  validateRequest(userValidations.userUpdateValidationSchema),
  userController.updateUserProfileInfo
);

export const userRoutes = router;
