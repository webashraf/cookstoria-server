import express from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { authControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login-user",
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser
);

router.post(
  "/change-password",
  auth("admin", "user"),
  authControllers.userPasswordChange
);
router.post("/generate-new-password", authControllers.forgatPassword);

export const authRoutes = router;
