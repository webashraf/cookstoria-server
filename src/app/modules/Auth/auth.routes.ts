import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { authControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login-user",
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser
);

router.post("/change-password", authControllers.userPasswordChange);

export const authRoutes = router;
