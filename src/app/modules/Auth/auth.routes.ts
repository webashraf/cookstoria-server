import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidator } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidator.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoute = router;
