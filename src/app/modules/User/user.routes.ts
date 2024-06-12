import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidatior } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidatior.userValidationSchema),
  UserController.signupUser
);

export const userRoute = router;
